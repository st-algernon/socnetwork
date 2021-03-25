import { NgModule } from '@angular/core';
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
import { AuthLayoutComponent } from './shared/components/auth-layout/auth-layout.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { RegistrationPageComponent } from './auth-page/registration-page/registration-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/services/auth.guard';

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
    AuthPageComponent,
    RegistrationPageComponent,
    AuthLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
