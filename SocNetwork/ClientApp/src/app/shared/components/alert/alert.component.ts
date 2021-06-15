import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessengerHub } from '../../hubs/messenger.hub';
import { Message, MessageAlert, ShortProfile } from '../../interfaces';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() me: ShortProfile;
  messageAlerts: MessageAlert[] = [];
  subs: Subscription[] = [];

  constructor(
    private messengerHub: MessengerHub,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.subs.push(
      this.messengerHub.message$.subscribe((message: Message) => {
        if (this.router.isActive('messenger', false)) {
          return
        }

        if (message.authorDTO.id != this.me.id) {
          let messageAlert = this.messageAlerts.find(ma => ma.message.chatId == message.chatId); 

          if (messageAlert) {
            messageAlert.messagesNumber++;
          } 
          else {
            messageAlert = {
              message: message,
              messagesNumber: 1
            };

            this.messageAlerts.push(messageAlert);
          }

          console.log('FROM ALERT', this.messageAlerts);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => {
      s.unsubscribe();
    });
  }

  collapseMessageAlert(alert: MessageAlert) {
    this.router.navigate(['/messenger', 'chat', alert.message.chatId]);
    this.messageAlerts.splice(this.messageAlerts.indexOf(alert));
  }

  toString(): void {
    // switch (this.notifType as PostNotifType) {
    //     case PostNotifType.Liked:
    //         return `${this.senderDTO.name} вподобав(ла) Вашу публікацію`;
    //         break;
    //     case PostNotifType.Commented:
    //         return `${this.senderDTO.name} прокоментував(ла) Вашу публікацію`;
    //         break;
    //     case PostNotifType.Repost:
    //         return `${this.senderDTO.name} поширив(ла) Вашу публікацію`;
    //         break;
    // }
}

}
