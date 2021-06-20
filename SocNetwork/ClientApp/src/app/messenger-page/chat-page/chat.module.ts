import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessengerHub } from 'src/app/shared/hubs/messenger.hub';
import { ChatsService } from 'src/app/shared/services/chats.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatPageComponent } from './chat-page.component';
import { ChatRoutingModule } from './chat-routing.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    ChatPageComponent
  ],
  imports: [
    ChatRoutingModule,
    FormsModule,
    CommonModule,
    NgScrollbarModule,
    SharedModule,
    InfiniteScrollModule
  ],
  providers: [
    ChatsService
  ],
  bootstrap: []
})
export class ChatModule { }