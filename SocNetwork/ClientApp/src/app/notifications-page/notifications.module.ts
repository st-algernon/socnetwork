import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NotificationsPageComponent } from "./notifications-page.component";
import { NotificationsRoutingModule } from "./notifications-routing.module";
import { NotificationsService } from "../shared/services/notifications.service";

@NgModule({
    declarations: [
        NotificationsPageComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        NgScrollbarModule,
        NotificationsRoutingModule
    ],
    exports: [],
    providers: [NotificationsService]
})
export class NotificationsModule {}