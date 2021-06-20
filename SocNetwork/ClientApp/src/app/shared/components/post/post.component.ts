import { HashLocationStrategy } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificType, SubjectType } from '../../enums';
import { NotificationsHub } from '../../hubs/notifications.hub';
import { PostsHub } from '../../hubs/posts.hub';
import { Comment, CommentRequest, Media, Post, NotificRequest, ShortProfile, UserPost, UserComment } from '../../interfaces';
import { MediaService } from '../../services/media.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  @Input() post: Post;
  @Input() me: ShortProfile;
  @Input() commentsBehavior: 'all' | 'best' | 'none' = 'best';
  @Input() commentMaker: boolean = true;

  commentForm: {
    text: string,
    images: File[]
  }
  comments: Comment[] = [];
  commentsLoaded: boolean = false;
  previewImagesData: Media[] = [];
  subs: Subscription[] = [];

  @ViewChild('post_text_container', { static: true }) postTextContainer: ElementRef;

  constructor(
    private renderer: Renderer2,
    private postsService: PostsService,
    private mediaService: MediaService,
    private postsHub: PostsHub,
    private notificsHub: NotificationsHub
  ) {
    this.commentForm = {
      text: '',
      images: []
    }
  }

  ngOnInit() {
    this.renderTextWithHashtags(this.post.text, this.postTextContainer.nativeElement);
    
    if (this.commentsBehavior == 'all') {
      this.loadComments();
    }
    else if (this.commentsBehavior == 'best' && this.post.bestCommentDTO) {
      this.comments.push(this.post.bestCommentDTO);
    }
    else {
      this.comments = [];
    }

    this.subs.push(

      this.postsHub.postLikes$.subscribe((userPost: UserPost) => {
        
        if (this.post.id == userPost.postId) {
          let index = this.post.userPostDTOs.findIndex(up => up.userDTO.id === this.me.id);
          this.post.userPostDTOs.splice(index, 1, userPost);

          console.log('from callback', this.post.userPostDTOs.find(up => up.userDTO.id === this.me.id))
          console.log(userPost);
          if (userPost.isLiked) {
            this.post.likesNumber++;

            const request: NotificRequest = {
              recipientId: this.post.authorDTO.id,
              subjectId: this.post.id,
              subjectType: SubjectType.Post,
              notificType: NotificType.Liked
            };
            
            this.notificsHub.notify(request);
          } else {
            this.post.likesNumber--;
          }
        }
      }),

      this.postsHub.commentLikes$.subscribe((userComment: UserComment) => {
        let comment = this.comments.find(c => c.id === userComment.commentId);
        console.log(userComment);
        if (comment) {
          let index = comment.userCommentDTOs.findIndex(uc => uc.userDTO.id === this.me.id);
          comment.userCommentDTOs.splice(index, 1, userComment);

          if (userComment.isLiked) {
            const request: NotificRequest = {
              recipientId: this.getCommentAuthorById(userComment.commentId).id,
              subjectId: userComment.commentId,
              subjectType: SubjectType.Comment,
              notificType: NotificType.Liked
            };
            
            this.notificsHub.notify(request);

            comment.likesNumber++;
          } else {
            comment.likesNumber--;
          }
        }
      })

    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => {
      s.unsubscribe();
    })
  }
  
  toggleLikePost(likeBtn: HTMLElement) {
    let up = this.post.userPostDTOs.find(up => up.userDTO.id == this.me.id && up.isLiked);

    if(up) {
      this.postsHub.unlikePost(this.post.id);
      likeBtn.classList.remove('clicked');
    } else {
      this.postsHub.likePost(this.post.id);
      likeBtn.classList.add('clicked');
    }
  }

  postLiked() {
    return this.post.userPostDTOs.some(up => up.userDTO.id == this.me.id && up.isLiked);
  }

  commentLiked(comment: Comment) {
    return comment.userCommentDTOs.some(up => up.userDTO.id == this.me.id && up.isLiked);
  }

  likeComment(comment: Comment, likeBtn: HTMLElement) {
    let uc = comment.userCommentDTOs.find(uc => uc.userDTO.id == this.me.id && uc.isLiked);
    
    if(uc) {
      this.postsHub.unlikeComment(comment.id);
      likeBtn.classList.remove('clicked');
    } else {
      this.postsHub.likeComment(comment.id);
      likeBtn.classList.add('clicked');
    }
  }

  stopPropagation($event: MouseEvent) {
    $event.stopPropagation();
  }

  loadComments() {
    this.subs.push(

      this.postsService.getComments(this.post.id).subscribe((comments: Comment[]) => {
        console.log(comments);
        this.commentsLoaded = true;
        this.comments = comments;
      })

    )
  }

  getCommentAuthorById(commentId: string): ShortProfile {
    return this.comments.find(c => c.id = commentId).authorDTO;
  }

  renderTextWithHashtags (text: string, textContainer: HTMLElement) {
    const hashtags = text.match(/(#(?:[^\x00-\x7F]|\w)+)/g);

    if (hashtags) {
      for (let hashtag of hashtags) {
        console.log(text);
        const s = text.slice(0, text.indexOf(hashtag));
        const textPiece = this.renderer.createText(s);
  
        const a = this.renderer.createElement('a');
        this.renderer.setAttribute(a, 'href', `/search/hashtag/${hashtag.slice(1)}`);
        const aText = this.renderer.createText(hashtag);
  
        this.renderer.appendChild(textContainer, textPiece);
        this.renderer.appendChild(a, aText);
        this.renderer.appendChild(textContainer, a);
  
        text = text.slice(text.indexOf(hashtag) + hashtag.length);
      }

      const restText = this.renderer.createText(text);
      this.renderer.appendChild(textContainer, restText);
    } else {
      textContainer.innerText = text;
    }
  }

  onSubmitComment(form: NgForm) {

    if (!this.commentForm.text && this.commentForm.images.length == 0) {
      return;
    }
    
    const commentRequest: CommentRequest = {
      postId: this.post.id,
      text: this.commentForm.text,
      mediaDTOs: []
    };

    if (this.commentForm.images.length != 0) {
      const formData = new FormData();

      [...this.commentForm.images].forEach((file, i) => {
        formData.set('file' + i, file, file.name);
      });

      this.subs.push(
        this.mediaService.uploadMedia(formData).subscribe(
          (mediaDTOs: Media[]) => {
            commentRequest.mediaDTOs = mediaDTOs;

            this.subs.push(            
              this.postsService.saveComment(commentRequest).subscribe((comment: Comment) => {
                console.log(comment);
                this.comments.push(comment);

                const request: NotificRequest = {
                  recipientId: this.post.authorDTO.id,
                  subjectId: this.post.id,
                  subjectType: SubjectType.Post,
                  notificType: NotificType.Commented
                }
                
                this.notificsHub.notify(request);
              })
            );
            this.previewImagesData = [];
          }
        )
      );
    } else if (this.commentForm.text) {
      this.subs.push(            
        this.postsService.saveComment(commentRequest).subscribe((comment: Comment) => {
          console.log(comment);
          this.comments.push(comment);

          const request: NotificRequest = {
            recipientId: this.post.authorDTO.id,
            subjectId: this.post.id,
            subjectType: SubjectType.Post,
            notificType: NotificType.Commented
          }
          
          this.notificsHub.notify(request);
        })
      );
    }

    this.commentForm = {
      text: '',
      images: []
    };
  }

  onEnterSubmit(form: NgForm, event: KeyboardEvent): void {
    if (event.key == 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSubmitComment(form);
    }
  }

  previewImages(files: File[]) {
    this.commentForm.images = files;
    this.previewImagesData = [];

    for(let file of files) {

      if (file.type.match('image*')) {

        const reader = new FileReader();
          
        reader.onload = (e: ProgressEvent) => { 
          this.previewImagesData.push({
            id: file.name,
            mimeType: file.type,
            path: (e.target as FileReader).result.toString(),
            size: file.size,
            creationDate: new Date(file.lastModified)
          });
        };
      
        reader.readAsDataURL(file);
      }
    }
  }

  unPreviewImages() {
    this.commentForm.images = [];
    this.previewImagesData = [];
  }

  resizeTextarea(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight * 5 / 7 + 'px';
  }

  isToday() {
    const creationDate = new Date(this.post.creationDate);
    const today = new Date();
    const isToday = creationDate.getDate() == today.getDate() &&
                    creationDate.getMonth() == today.getMonth() &&
                    creationDate.getFullYear() == today.getFullYear(); 

    return isToday;
  }

}
