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

}
