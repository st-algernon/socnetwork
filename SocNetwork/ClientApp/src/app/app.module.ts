import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NewsPageComponent } from './news-page/news-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ExplorePageComponent } from './explore-page/explore-page.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { PhotosPageComponent } from './photos-page/photos-page.component';
import { MusicPageComponent } from './music-page/music-page.component';
import { VideosPageComponent } from './videos-page/videos-page.component';
import { SavedPageComponent } from './saved-page/saved-page.component';
import { MessengerPageComponent } from './messenger-page/messenger-page.component';
import { UserLayoutComponent } from './shared/components/user-layout/user-layout.component';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsPageComponent,
    ProfilePageComponent,
    ExplorePageComponent,
    NotificationsPageComponent,
    PhotosPageComponent,
    MusicPageComponent,
    VideosPageComponent,
    SavedPageComponent,
    MessengerPageComponent,
    UserLayoutComponent,
    NotFoundPageComponent,
    AuthPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
