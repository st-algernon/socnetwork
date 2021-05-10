import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginPageComponent } from './login-page.component';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  declarations: [
      LoginPageComponent,
    ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class LoginModule { }