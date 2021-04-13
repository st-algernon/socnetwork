import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../interfaces';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  @Input() me: User;

  constructor() { }

  ngOnInit() {
  }

}
