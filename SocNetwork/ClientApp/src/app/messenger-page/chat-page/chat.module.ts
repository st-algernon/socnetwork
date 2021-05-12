import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessengerHub } from 'src/app/shared/hubs/messenger.hub';
import { MessengerService } from 'src/app/shared/services/messenger.service';
import { ChatPageComponent } from './chat-page.component';
import { ChatRoutingModule } from './chat-routing.module';

@NgModule({
  declarations: [
    ChatPageComponent
  ],
  imports: [
    ChatRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    MessengerService
  ],
  bootstrap: []
})
export class ChatModule { }