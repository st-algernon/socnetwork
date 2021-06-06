import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersLayoutComponent } from './shared/users-layout/users-layout.component';
import { FollowingPageComponent } from './following-page/following-page.component';
import { FollowersPageComponent } from './followers-page/followers-page.component';
import { UsersRoutingModule } from './users-routing.module';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [
      UsersLayoutComponent,
      FollowingPageComponent,
      FollowersPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    NgScrollbarModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
