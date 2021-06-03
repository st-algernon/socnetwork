import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../../interfaces';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  @Input() me: Profile;

  constructor() { }

  ngOnInit() {
  }

  resize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    // textarea.style.height = 'auto';
    // textarea.style.height = textarea.scrollHeight + 'px';

    console.dir(textarea);
    console.log(textarea.clientHeight);
    console.log(textarea.scrollHeight);
  }

  submit(textarea: HTMLTextAreaElement) {
    console.dir(textarea.value);
    console.log(textarea.value);

    const parser = new DOMParser();
    const result = parser.parseFromString(textarea.value, 'text/html');

    console.log(result);
  }
}
