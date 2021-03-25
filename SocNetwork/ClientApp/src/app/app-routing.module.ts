import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthPageComponent } from "./auth-page/auth-page.component";
import { RegistrationPageComponent } from "./auth-page/registration-page/registration-page.component";
import { MessengerPageComponent } from "./messenger-page/messenger-page.component";
import { NewsPageComponent } from "./news-page/news-page.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { AuthLayoutComponent } from "./shared/components/auth-layout/auth-layout.component";
import { NotFoundPageComponent } from "./shared/components/not-found-page/not-found-page.component";
import { UserLayoutComponent } from "./shared/components/user-layout/user-layout.component";
import { AuthGuard } from "./shared/services/auth.guard";

const routes : Routes = [
    {
        path: '', component: UserLayoutComponent, children: [
            { path: '', redirectTo: 'news', pathMatch: 'full' },
            { path: 'news', component: NewsPageComponent, canActivate: [AuthGuard] },
            { path: 'u/:id', component: ProfilePageComponent, canActivate: [AuthGuard] },
            { path: 'messenger', component: MessengerPageComponent, canActivate: [AuthGuard] }
        ]
    },
    { 
        path: 'auth', component: AuthLayoutComponent, children: [
            { path: '', component: AuthPageComponent },
            { path: "sign-up", component: RegistrationPageComponent }
        ]
    },
    { path: '**', component: NotFoundPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }