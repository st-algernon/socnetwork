import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { SearchLayoutComponent } from './shared/search-layout/search-layout.component';
import { UsersPageComponent } from './users-page/users-page.component';

const routes: Routes = [
  { path: 'hashtag/:content', component: PostsPageComponent },
  { path: 'users/:username', component: UsersPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }