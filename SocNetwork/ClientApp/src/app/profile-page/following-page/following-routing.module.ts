import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FollowingPageComponent } from './following-page.component';

const routes: Routes = [{ path: '', component: FollowingPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FollowingRoutingModule { }
