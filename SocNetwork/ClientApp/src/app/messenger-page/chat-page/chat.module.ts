import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessengerHub } from 'src/app/shared/hubs/messenger.hub';
import { ChatsService } from 'src/app/shared/services/chats.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatPageComponent } from './chat-page.component';
import { ChatRoutingModule } from './chat-routing.module';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [
    ChatPageComponent
  ],
  imports: [
    ChatRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    NgScrollbarModule,
    SharedModule
  ],
  providers: [
    ChatsService
  ],
  bootstrap: []
})
export class ChatModule { }