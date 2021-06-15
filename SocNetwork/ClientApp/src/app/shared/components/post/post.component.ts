import { HashLocationStrategy } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Comment, Post, ShortProfile } from '../../interfaces';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  @Input() me: ShortProfile;
  @Input() commentsBehavior: 'all' | 'best' | 'none' = 'best';

  author: ShortProfile;
  comments: Comment[] = [];

  constructor(
    private renderer: Renderer2,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.author = this.post.userPostDTOs.find(up => up.isAuthor).userDTO;

    if (this.commentsBehavior == 'all') {
      this.postsService.getComments(this.post.id).subscribe((comments: Comment[]) => {
        this.comments = comments;
      })
    }
    else if (this.commentsBehavior == 'best') {
      this.comments.push(this.post.bestCommentDTO);
    }
    else {
      this.comments = [];
    }

  }

  getCommentAuthor(comment: Comment) {
    comment.userCommentDTOs.find(uc => uc.isAuthor).userDTO;
  }

  likePost() {
    this.post.likesNumber++;
  }

  renderTextWithHashtags (text: string, textContainer: HTMLElement) {
    const hashtags = text.match(/(#(?:[^\x00-\x7F]|\w)+)/g);

    if (hashtags) {
      for (let hashtag of hashtags) {
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
    } else {
      (textContainer as HTMLElement).innerText = text;
    }
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
