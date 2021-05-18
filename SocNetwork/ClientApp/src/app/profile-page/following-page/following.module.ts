import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowingPageComponent } from './following-page.component';
import { FollowingRoutingModule } from './following-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [FollowingPageComponent],
  imports: [
    CommonModule,
    FollowingRoutingModule,
    ScrollingModule
  ]
})
export class FollowingModule { }
