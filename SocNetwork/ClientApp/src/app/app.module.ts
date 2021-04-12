import { NgModule, Provider } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './shared/services/auth.guard';
import { UserLayoutComponent } from './shared/components/user-layout/user-layout.component';
import { CommonModule } from '@angular/common';
import { ProfileMenuPopupComponent } from './shared/components/user-layout/profile-menu-popup/profile-menu-popup.component';
import { SearchResultPopupComponent } from './shared/components/user-layout/search-result-popup/search-result-popup.component';
import { DropdownComponent } from './shared/components/dropdown/dropdown.component';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { AuthInterceptor } from './shared/auth.interceptor';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    UserLayoutComponent,
    ProfileMenuPopupComponent,
    SearchResultPopupComponent,
    DropdownComponent,
    NotFoundPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [INTERCEPTOR_PROVIDER, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
