import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { MessengerPageComponent } from "./messenger-page/messenger-page.component";
import { NewsPageComponent } from "./news-page/news-page.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { NotFoundPageComponent } from "./shared/components/not-found-page/not-found-page.component";
import { UserLayoutComponent } from "./shared/components/user-layout/user-layout.component";

const routes : Routes = [
    {
        path: '', component: UserLayoutComponent, children: [
          { path: '', component: NewsPageComponent },
          { path: 'u/:id', component: ProfilePageComponent },
          { path: 'messenger', component: MessengerPageComponent }
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