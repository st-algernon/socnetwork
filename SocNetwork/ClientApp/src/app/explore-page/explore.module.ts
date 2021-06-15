import { CommonModule } from '@angular/common';
import { ExplorePageComponent } from './explore-page.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { ExploreRoutingModule } from './explore-routing.module';

@NgModule({
  declarations: [
    ExplorePageComponent
  ],
  imports: [
    CommonModule,
    NgScrollbarModule,
    ExploreRoutingModule,
    SharedModule
  ]
})
export class ExploreModule {}