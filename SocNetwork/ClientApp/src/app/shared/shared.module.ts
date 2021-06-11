import { CommonModule, registerLocaleData } from "@angular/common";
import { NgModule } from "@angular/core";
import { PostFormComponent } from "./components/post-form/post-form.component";
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

registerLocaleData(localeUk, 'uk');

@NgModule({
  declarations: [
    ContainerDirective,
    PostComponent,
    PostFormComponent,
    TrendsComponent,
    FollowOffersComponent,
    PhotosComponent,
    LoaderComponent,
    PhotosContainerComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgScrollbarModule,
  ],
  exports: [
    ContainerDirective,
    PostComponent,
    PostFormComponent,
    TrendsComponent,
    FollowOffersComponent,
    PhotosComponent,
    LoaderComponent,
    PhotosContainerComponent,
    MessageComponent
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
