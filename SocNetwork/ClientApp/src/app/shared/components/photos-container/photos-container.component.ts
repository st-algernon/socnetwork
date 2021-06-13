import { Component, Input, OnInit } from '@angular/core';
import { Media } from '../../interfaces';

@Component({
  selector: 'app-photos-container',
  templateUrl: './photos-container.component.html',
  styleUrls: ['./photos-container.component.css']
})
export class PhotosContainerComponent implements OnInit {

  @Input() photos: Media[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
