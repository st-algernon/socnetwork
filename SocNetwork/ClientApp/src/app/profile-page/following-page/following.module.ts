import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowingPageComponent } from './following-page.component';
import { FollowingRoutingModule } from './following-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FollowingPageComponent],
  imports: [
    CommonModule,
    FollowingRoutingModule,
    ScrollingModule,
    SharedModule
  ]
})
export class FollowingModule { }
