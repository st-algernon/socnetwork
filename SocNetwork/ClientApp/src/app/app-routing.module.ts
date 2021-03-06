import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { UserLayoutComponent } from "./shared/components/user-layout/user-layout.component";
import { AuthGuard } from "./shared/services/auth.guard";
import { AuthService } from "./shared/services/auth.service";

const routes : Routes = [
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: '', component: UserLayoutComponent, children: [
        { path: '', redirectTo: 'news', pathMatch: 'full' },
        { path: 'news', loadChildren: () => import('./news-page/news.module').then(m => m.NewsModule), canActivate: [AuthGuard] },
        { path: 'messenger', loadChildren: () => import('./messenger-page/messenger.module').then(m => m.MessengerModule), canActivate: [AuthGuard] },
        { path: 'notifications', loadChildren: () => import('./notifications-page/notifications.module').then(m => m.NotificationsModule), canActivate: [AuthGuard] },
        { path: 'explore', loadChildren: () => import('./explore-page/explore.module').then(m => m.ExploreModule), canActivate: [AuthGuard] },
        { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule), canActivate: [AuthGuard] },
        { path: 'saved', loadChildren: () => import('./saved-page/saved.module').then(m => m.SavedModule), canActivate: [AuthGuard] },
        { path: ':username', loadChildren: () => import('./profile-page/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },
    ]},
    { path: '**', component: NotFoundPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }