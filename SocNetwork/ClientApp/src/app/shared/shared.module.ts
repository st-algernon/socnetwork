import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PostFormComponent } from "./components/post-form/post-form.component";
import { PostComponent } from "./components/post/post.component";
import { TrendsComponent } from './components/trends/trends.component';
import { FollowOffersComponent } from './components/follow-offers/follow-offers.component';
import { PhotosComponent } from './components/photos/photos.component';

@NgModule({
  declarations: [
    PostComponent,
    PostFormComponent,
    TrendsComponent,
    FollowOffersComponent,
    PhotosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PostComponent,
    PostFormComponent,
    TrendsComponent,
    FollowOffersComponent,
    PhotosComponent
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
