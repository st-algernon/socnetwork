import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePageComponent } from './profile-page.component';


const routes: Routes = [
  { path: '', component: ProfilePageComponent, pathMatch: 'full' },
  { path: 'photos', loadChildren: () => import('./photos-page/photos.module').then(m => m.PhotosModule) },
  { path: 'post/:id', loadChildren: () => import('./post-page/post.module').then(m => m.PostModule) },
  { path: '', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
