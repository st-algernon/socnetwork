import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';

// const routes: Routes = [
//     { path: '', component: AuthLayoutComponent, children: [
//         { path: '', loadChildren: () => import('./login-page/login.module').then(m => m.LoginModule) },
//         { path: 'sign-up', loadChildren: () => import('./registration-page/registration.module').then(m => m.RegistrationModule) },
//     ] }];

const routes: Routes = [
    { path: '', component: AuthLayoutComponent, children: [
        { path: '', component: LoginPageComponent },
        { path: 'sign-up', component: RegistrationPageComponent },
    ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
