import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessengerHub } from '../shared/hubs/messenger.hub';
import { Chat, Profile } from '../shared/interfaces';
import { MessengerService } from '../shared/services/messenger.service';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-messenger-page',
  templateUrl: './messenger-page.component.html',
  styleUrls: ['./messenger-page.component.css']
})
export class MessengerPageComponent implements OnInit, OnDestroy {

  me: Profile;
  chats: Chat[];
  subs: Subscription[] = [];

  constructor(
    private messengerHub: MessengerHub,
    private messengerService: MessengerService,
    private usersService: UsersService
    ) { }

  ngOnInit() {
    this.subs.push(
      this.usersService.me$.subscribe((response: Profile) => this.me = response),

      this.messengerService.getChats().subscribe((response: Chat[]) => { 
        this.chats = response.map(c => this.messengerService.includeWithUser(c, this.me));
        console.log(this.chats);
      }),
    );
  }

  ngOnDestroy() {
    this.subs.forEach(
      s => s.unsubscribe()
    );
  }
}
