import { CommonModule, registerLocaleData } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MessengerService } from "../shared/services/messenger.service";
import { ChatPageComponent } from "./chat-page/chat-page.component";
import { MessengerPageComponent } from "./messenger-page.component";
import { MessengerRoutingModule } from "./messenger-routing.module";
import localeUk from '@angular/common/locales/uk';

registerLocaleData(localeUk, 'uk');

@NgModule({
    declarations: [
        MessengerPageComponent
    ],
    imports: [
        MessengerRoutingModule,
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: [MessengerService]
})
export class MessengerModule {}