import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User, UsersResponse } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { MeStorage } from '../../services/me-storage.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit, AfterContentChecked {

  me: User;

  profileMenuIsOpened = false;

  constructor(
    private meStorage: MeStorage,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
    this.meStorage.me$.subscribe((response: User) => { this.me = response});
  }

  toogleProfileMenu() {
    if (this.profileMenuIsOpened) {
      this.profileMenuIsOpened = false;
    } else {
      this.profileMenuIsOpened = true;
    }
  }

}
