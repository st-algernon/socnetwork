import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FollowersPageComponent } from './followers-page.component';

const routes: Routes = [{ path: '', component: FollowersPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FollowersRoutingModule { }
