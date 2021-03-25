import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { UserLayoutComponent } from "./shared/components/user-layout/user-layout.component";
import { AuthGuard } from "./shared/services/auth.guard";

const routes : Routes = [
    // {
    //     path: '', component: UserLayoutComponent, children: [
    //         { path: '', redirectTo: 'news', pathMatch: 'full' },
    //         { path: 'news', component: NewsPageComponent, canActivate: [AuthGuard] },
    //         // { path: 'u/:id', component: ProfilePageComponent, canActivate: [AuthGuard] },
    //         { path: 'messenger', component: MessengerPageComponent, canActivate: [AuthGuard] }
    //     ]
    // },
    // { 
    //     // path: 'auth', component: AuthLayoutComponent, children: [
    //     //     { path: '', component: AuthPageComponent },
    //     //     { path: "sign-up", component: RegistrationPageComponent }
    //     // ]
    // },

    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: '', component: UserLayoutComponent, children: [
        { path: 'profile', loadChildren: () => import('./profile-page/profile.module').then(m => m.ProfileModule) }
    ] },
    // { path: '**', component: NotFoundPageComponent },
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }