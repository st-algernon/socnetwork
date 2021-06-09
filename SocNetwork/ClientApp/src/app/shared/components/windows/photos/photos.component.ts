import { Component, Input, OnInit } from '@angular/core';
import { MediaFor } from '../../../enums';
import { ProfileMedia } from '../../../interfaces';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  @Input() photos: ProfileMedia[];

  constructor() { }

  ngOnInit(): void {

    if (this.photos) {
      this.photos.sort(
        (a, b) => { 
          return +new Date(b.creationDate) - +new Date(a.creationDate);
      });

      this.photos = this.photos.filter(p => p.isCurrent != true && p.mediaFor == MediaFor.Avatar);
      this.photos = this.photos.slice(0, 6);
    }
  }

}
