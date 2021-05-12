import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MessengerPageComponent } from "./messenger-page.component";

const routes: Routes = [
    { path: '', component: MessengerPageComponent },
    { path: 'chat/:id', loadChildren: () => import('./chat-page/chat.module').then(m => m.ChatModule) }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MessengerRoutingModule {}