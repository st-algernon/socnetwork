import { CommonModule, registerLocaleData } from "@angular/common";
import { NgModule } from "@angular/core";
import { PostMakerComponent } from "./components/post-maker/post-maker.component";
import { PostComponent } from "./components/post/post.component";
import { TrendsComponent } from './components/windows/trends/trends.component';
import { FollowOffersComponent } from './components/windows/follow-offers/follow-offers.component';
import { PhotosComponent } from './components/windows/photos/photos.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { LoaderComponent } from './components/loader/loader.component';
import { PhotosContainerComponent } from './components/photos-container/photos-container.component';
import { MessageComponent } from './components/message/message.component';
import { ContainerDirective } from "./directives/container.directive";

import localeUk from '@angular/common/locales/uk';
import { FormsModule } from "@angular/forms";
import { PostsService } from "./services/posts.service";
import { TagsService } from "./services/tags.service";
import { RouterModule } from "@angular/router";
import { EmptyPostComponent } from './components/empty-post/empty-post.component';
import { AlertComponent } from './components/alert/alert.component';
import { SearchMakerComponent } from './components/search-maker/search-maker.component';
import { ShortUserComponent } from './components/short-user/short-user.component';

registerLocaleData(localeUk, 'uk');

@NgModule({
  declarations: [
    ContainerDirective,
    PostComponent,
    PostMakerComponent,
    TrendsComponent,
    FollowOffersComponent,
    PhotosComponent,
    LoaderComponent,
    PhotosContainerComponent,
    MessageComponent,
    EmptyPostComponent,
    AlertComponent,
    SearchMakerComponent,
    ShortUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgScrollbarModule,
    RouterModule
  ],
  exports: [
    ContainerDirective,
    PostComponent,
    PostMakerComponent,
    TrendsComponent,
    FollowOffersComponent,
    PhotosComponent,
    LoaderComponent,
    PhotosContainerComponent,
    MessageComponent,
    EmptyPostComponent,
    AlertComponent,
    SearchMakerComponent
  ],
  providers: [
    PostsService,
    TagsService
  ],
  bootstrap: []
})
export class SharedModule { }
