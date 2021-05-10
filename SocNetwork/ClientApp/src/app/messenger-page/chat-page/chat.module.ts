import { NgModule } from '@angular/core';
import { ChatPageComponent } from './chat-page.component';
import { ChatRoutingModule } from './chat-routing.module';

@NgModule({
  declarations: [
    ChatPageComponent
  ],
  imports: [
    ChatRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class ChatModule { }