import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SavedPageComponent } from './saved-page.component';

const routes: Routes = [{ path: '', component: SavedPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavedRoutingModule { }
