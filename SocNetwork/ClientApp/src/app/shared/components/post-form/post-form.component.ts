import { Component, Input, OnInit } from '@angular/core';
import { ShortProfile } from '../../interfaces';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  @Input() me: ShortProfile;
  text: string = '';
  isEmojiPickerVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  resize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  addEmoji(event) {
    console.log(event.emoji);
    this.text = `${this.text}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
 }

  submit() {

  }
}
