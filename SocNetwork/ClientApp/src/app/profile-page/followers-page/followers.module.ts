import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowersPageComponent } from './followers-page.component';
import { FollowersRoutingModule } from './followers-routing.module';

@NgModule({
  declarations: [FollowersPageComponent],
  imports: [
    CommonModule,
    FollowersRoutingModule
  ]
})
export class FollowersModule { }
