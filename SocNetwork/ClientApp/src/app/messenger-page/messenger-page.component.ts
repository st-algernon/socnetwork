import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessengerHub } from '../shared/hubs/messenger.hub';
import { ShortChat, ShortProfile } from '../shared/interfaces';
import { MessengerService } from '../shared/services/messenger.service';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-messenger-page',
  templateUrl: './messenger-page.component.html',
  styleUrls: ['./messenger-page.component.css']
})
export class MessengerPageComponent implements OnInit, OnDestroy {

  me: ShortProfile;
  chats: ShortChat[];
  subs: Subscription[] = [];

  constructor(
    private messengerHub: MessengerHub,
    private messengerService: MessengerService,
    private usersService: UsersService
    ) { }

  ngOnInit() {
    this.subs.push(
      this.usersService.me$.subscribe((shortProfile: ShortProfile) => this.me = shortProfile),

      this.messengerService.getChats().subscribe((shortChats: ShortChat[]) => { 
        this.chats = shortChats;
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(
      s => s.unsubscribe()
    );
  }
}
