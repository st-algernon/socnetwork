import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Media } from 'src/app/shared/interfaces';
import { MediaService } from 'src/app/shared/services/media.service';

@Component({
  selector: 'app-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.css']
})
export class PhotosPageComponent implements OnInit {

  photos: Media[];
  subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private mediaService: MediaService
  ) { }

  ngOnInit() {
    this.subs.push(
      this.route.params.pipe(
        switchMap((params: Params) => {
          return this.mediaService.getUserMedia(params['username']);
        })
      ).subscribe((media: Media[]) => {
        this.photos = media;
      })
    )
  }

}
