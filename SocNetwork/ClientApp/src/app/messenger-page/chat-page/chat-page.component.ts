import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { MessageState, MessageStatus } from 'src/app/shared/enums';
import { Chat, ChatRequest, MessageRequest, Profile } from 'src/app/shared/interfaces';
import { MessengerHub } from 'src/app/shared/hubs/messenger.hub';
import { MessengerService } from 'src/app/shared/services/messenger.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit, OnDestroy {
  me: Profile;
  form: FormGroup;
  chat: Chat;
  // get messageText() {
  //   return this.form.get('messageText');
  // }

  constructor(
    private messengerHub: MessengerHub,
    private messengerService: MessengerService,
    private usersService: UsersService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.usersService.me$.subscribe((response: Profile) => this.me = response);

    this.messengerHub.startConnection();
    this.messengerHub.addReceivedMessageListener();
    
    this.form = new FormGroup({
      messageText: new FormControl(null)
    })

    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.messengerService.getChatWith(params['id']);
      })
    ).subscribe((response: Chat) => { 
      this.chat = response;
    });
  }

  ngOnDestroy() {

  }

  submit() {
    const messageRequest: MessageRequest = {
      authorId: this.me.id,
      text: this.form.value.messageText,
      creationDate: new Date().toJSON(),
      messageMediaDTO: [],
      messageStatus: MessageStatus.IsInitial,
      messageState: MessageState.IsSent
    };

    const chatRequest: ChatRequest = {
      id: this.chat.id,
      membersId: this.chat.membersDTO.map(m => m.id)
    };

    console.log('submitted chat', chatRequest);
    console.log('submitted message', messageRequest);

    this.messengerHub.sendMessage(chatRequest, messageRequest);
  }
}
