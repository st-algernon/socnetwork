import { HashLocationStrategy } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Post, ShortProfile } from '../../interfaces';

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

  @ViewChild('textContainer', { static: true }) textContainer: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.author = this.post.userPostDTOs.find(up => up.isAuthor).userDTO;

    this.renderText();
  }

  likePost() {
    this.post.likesNumber++;
  }

  renderText () {
    const hashtags = this.post.text.match(/(#(?:[^\x00-\x7F]|\w)+)/g);

    if (hashtags) {
      let text = this.post.text;

      for (let hashtag of hashtags) {
        const s = text.slice(0, text.indexOf(hashtag));
        const textPiece = this.renderer.createText(s);
  
        const a = this.renderer.createElement('a');
        this.renderer.setAttribute(a, 'href', `/search/hashtag/${hashtag.slice(1)}`);
        const aText = this.renderer.createText(hashtag);
  
        this.renderer.appendChild(this.textContainer.nativeElement, textPiece);
        this.renderer.appendChild(a, aText);
        this.renderer.appendChild(this.textContainer.nativeElement, a);
  
        text = text.slice(text.indexOf(hashtag) + hashtag.length);
      }
    } else {
      (this.textContainer.nativeElement as HTMLElement).innerText = this.post.text;
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
