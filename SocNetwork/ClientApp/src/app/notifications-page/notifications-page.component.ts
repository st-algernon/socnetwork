import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notification } from '../shared/interfaces';
import { NotificationsService } from '../shared/services/notifications.service';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.css']
})
export class NotificationsPageComponent implements OnInit, OnDestroy {

  notifs: Notification[];
  subs: Subscription[] = [];

  constructor(
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.subs.push(
      this.notificationsService.getCurrentUserNotifs().subscribe(
        (response) => {
          console.log(response);
        }
      )
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => {
      s.unsubscribe();
    })
  }
}
