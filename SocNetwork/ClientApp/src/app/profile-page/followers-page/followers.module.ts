import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowersPageComponent } from './followers-page.component';
import { FollowersRoutingModule } from './followers-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FollowersPageComponent],
  imports: [
    CommonModule,
    FollowersRoutingModule,
    SharedModule
  ]
})
export class FollowersModule { }
