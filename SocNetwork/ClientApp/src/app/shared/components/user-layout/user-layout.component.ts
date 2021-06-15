import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaFor } from '../../enums';
import { MessengerHub } from '../../hubs/messenger.hub';
import { NotificationsHub } from '../../hubs/notifications.hub';
import { ShortProfile } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit, OnDestroy {

  me: ShortProfile;
  subs: Subscription[] = [];
  profileMenuIsOpened = false;

  constructor(
    private usersService: UsersService,
    private messengerHub: MessengerHub,
    private notifsHub: NotificationsHub
  ) { }

  ngOnInit(): void {
    this.messengerHub.startConnection();
    this.messengerHub.addReceivedMessageListener();

    this.notifsHub.startConnection();
    this.notifsHub.addReceivedPostNotifsListener();
    this.notifsHub.addReceivedUserNotifsListener();

    this.subs.push(
      this.usersService.me$.subscribe((shortProfile: ShortProfile) => { this.me = shortProfile })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(
      s => s.unsubscribe()
    );
  }
}
