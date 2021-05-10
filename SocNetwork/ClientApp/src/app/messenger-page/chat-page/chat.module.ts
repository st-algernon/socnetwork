import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessengerHubService } from 'src/app/shared/services/messenger-hub.service';
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
  providers: [MessengerHubService],
  bootstrap: []
})
export class ChatModule { }