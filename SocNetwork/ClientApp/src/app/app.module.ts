import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './shared/services/auth.guard';
import { UserLayoutComponent } from './shared/components/user-layout/user-layout.component';
import { CommonModule } from '@angular/common';
import { ProfileMenuPopupComponent } from './shared/components/user-layout/profile-menu-popup/profile-menu-popup.component';
import { SearchResultPopupComponent } from './shared/components/user-layout/search-result-popup/search-result-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLayoutComponent,
    ProfileMenuPopupComponent,
    SearchResultPopupComponent
  ],
  imports: [
    CommonModule,
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
