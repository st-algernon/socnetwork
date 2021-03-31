import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePageComponent } from './profile-page.component';


const routes: Routes = [
  { path: '', component: ProfilePageComponent },
  { path: 'followers', loadChildren: () => import('./followers-page/followers.module').then(m => m.FollowersModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
