import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PostFormComponent } from "./components/post-form/post-form.component";
import { PostComponent } from "./components/post/post.component";
import { TrendsComponent } from './components/windows/trends/trends.component';
import { FollowOffersComponent } from './components/windows/follow-offers/follow-offers.component';
import { PhotosComponent } from './components/windows/photos/photos.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    PostComponent,
    PostFormComponent,
    TrendsComponent,
    FollowOffersComponent,
    PhotosComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    NgScrollbarModule
  ],
  exports: [
    PostComponent,
    PostFormComponent,
    TrendsComponent,
    FollowOffersComponent,
    PhotosComponent,
    LoaderComponent
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
