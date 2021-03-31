import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MessengerPageComponent } from "./messenger-page.component";
import { MessengerRoutingModule } from "./messenger-routing.module";

@NgModule({
    declarations: [
        MessengerPageComponent,
    ],
    imports: [
        MessengerRoutingModule,
        CommonModule
    ],
    exports: [],
    providers: []
})
export class MessengerModule {}