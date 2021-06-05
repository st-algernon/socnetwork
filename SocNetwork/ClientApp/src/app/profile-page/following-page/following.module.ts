import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowingPageComponent } from './following-page.component';
import { FollowingRoutingModule } from './following-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FollowingPageComponent],
  imports: [
    CommonModule,
    FollowingRoutingModule,
    SharedModule
  ]
})
export class FollowingModule { }
