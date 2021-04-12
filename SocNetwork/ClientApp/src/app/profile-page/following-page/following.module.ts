import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowingPageComponent } from './following-page.component';
import { FollowingRoutingModule } from './following-routing.module';

@NgModule({
  declarations: [FollowingPageComponent],
  imports: [
    CommonModule,
    FollowingRoutingModule
  ]
})
export class FollowingModule { }
