import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-saved-page',
  templateUrl: './saved-page.component.html',
  styleUrls: ['./saved-page.component.css']
})
export class SavedPageComponent implements OnInit {

  savedPosts: Post[] = [];

  constructor() { }

  ngOnInit() {
  }

}
