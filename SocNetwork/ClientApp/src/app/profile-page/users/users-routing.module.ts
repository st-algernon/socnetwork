import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FollowersPageComponent } from './followers-page/followers-page.component';
import { FollowingPageComponent } from './following-page/following-page.component';
import { UsersLayoutComponent } from './shared/users-layout/users-layout.component';


const routes: Routes = [
  { path: '', component: UsersLayoutComponent, children: [
    { path: 'following', component: FollowingPageComponent },
    { path: 'followers', component: FollowersPageComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
