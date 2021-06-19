import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubjectType } from '../shared/enums';
import { TranslatorNotifics } from '../shared/enums-options';
import { Notification, ShortProfile } from '../shared/interfaces';
import { NotificationsService } from '../shared/services/notifications.service';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.css']
})
export class NotificationsPageComponent implements OnInit, OnDestroy {

  me: ShortProfile;
  notifs: Notification[] = [];
  loaded: boolean = false;
  subs: Subscription[] = [];

  constructor(
    private notificationsService: NotificationsService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.subs.push(
      this.usersService.me$.subscribe((me: ShortProfile) => this.me = me),

      this.notificationsService.getCurrentUserNotifs().subscribe(
        (response: Notification[]) => {
          console.log(response);
          this.loaded = true;
          this.notifs = response;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => {
      s.unsubscribe();
    })
  }

  getLinkToSubject(notif: Notification): string {
    if (notif.subjectType == SubjectType.Post) {
      return '/' + this.me.username + '/post/' + notif.subjectId;
    }

    if (notif.subjectType == SubjectType.Comment) {
      return '/' + this.me.username + '/post/' + notif.subjectId;
    }

    if (notif.subjectType == SubjectType.None) {
      return '/' + notif.senderDTO.username;
    }
  }

  
  translateNotific(notific: Notification): string {
    return TranslatorNotifics.find(t => 
      t.key == notific.notificType &&
      t.subject == notific.subjectType
    ).value;
  }
}
