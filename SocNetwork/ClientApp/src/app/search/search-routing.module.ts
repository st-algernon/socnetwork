import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostPageComponent } from '../profile-page/post-page/post-page.component';
import { SearchLayoutComponent } from './shared/search-layout/search-layout.component';
import { UsersPageComponent } from './users-page/users-page.component';

const routes: Routes = [
    { path: '', component: SearchLayoutComponent, children: [
      { path: 'hashtag/:content', component: PostPageComponent },
      { path: 'users/:username', component: UsersPageComponent },
    ]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
