import { HashLocationStrategy } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PostNotifType } from '../../enums';
import { NotificationsHub } from '../../hubs/notifications.hub';
import { PostsHub } from '../../hubs/posts.hub';
import { Comment, CommentRequest, Media, Post, PostNotifRequest, ShortProfile, UserPost } from '../../interfaces';
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
  @Input() commentsBehavior: 'all' | 'best' | 'none' = 'all';
  @Input() commentMaker: boolean = true;

  commentForm: {
    text: string,
    images: File[]
  }
  author: ShortProfile;
  comments: Comment[] = [];
  previewImagesData: Media[] = [];
  subs: Subscription[] = [];

  @ViewChild('post_text_container', { static: true }) postTextContainer: ElementRef;

  constructor(
    private renderer: Renderer2,
    private postsService: PostsService,
    private mediaService: MediaService,
    private postsHub: PostsHub,
    private notificationsHub: NotificationsHub
  ) {
    this.commentForm = {
      text: '',
      images: []
    }
  }

  ngOnInit() {

    this.author = this.post.userPostDTOs.find(up => up.isAuthor).userDTO;
    this.renderTextWithHashtags(this.post.text, this.postTextContainer.nativeElement);
    
    if (this.commentsBehavior == 'all') {
      this.loadComments();
    }
    else if (this.commentsBehavior == 'best') {
      this.comments.push(this.post.bestCommentDTO);
    }
    else {
      this.comments = [];
    }
  }

  ngOnDestroy() {
    this.subs.forEach(s => {
      s.unsubscribe();
    })
  }
  
  likePost() {
    this.subs.push(

      this.postsHub.posts$.subscribe((userPost: UserPost) => {
        const request: PostNotifRequest = {
          recipientId: this.author.id,
          postId: this.post.id,
          notifType: PostNotifType.Liked
        }
        
        this.notificationsHub.postNotify(request);
      })

    );
  }

  loadComments() {
    this.subs.push(

      this.postsService.getComments(this.post.id).subscribe((comments: Comment[]) => {
        console.log(comments);
        this.comments = comments;
      })

    )
  }

  likeComment(commentId: string) {
    this.subs.push(


    );
  }

  getCommentAuthor(comment: Comment) {
    return comment.userCommentDTOs.find(uc => uc.isAuthor).userDTO;
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

  onSubmit(form: NgForm) {

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
      this.onSubmit(form);
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
