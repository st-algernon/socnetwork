import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-post',
  templateUrl: './empty-post.component.html',
  styleUrls: ['./empty-post.component.css']
})
export class EmptyPostComponent implements OnInit {

  @Input() withMedia: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
