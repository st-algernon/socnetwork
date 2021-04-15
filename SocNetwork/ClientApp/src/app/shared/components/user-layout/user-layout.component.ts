import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { User, UsersResponse } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { MeStorage } from '../../services/me-storage.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit, OnDestroy {

  me: User;
  meSub: Subscription;
  profileMenuIsOpened = true;

  constructor(
    private meStorage: MeStorage,
  ) { }

  ngOnInit(): void {
    this.meSub = this.meStorage.me$.subscribe((response: User) => { this.me = response });
  }

  ngOnDestroy(): void {
    this.meSub.unsubscribe();
  }
}
