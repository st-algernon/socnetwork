import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User, UsersResponse } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {

  me: User;

  profileMenuIsOpened = false;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.me = this.usersService.getMeFromStorage();
  }

  toogleProfileMenu() {
    if (this.profileMenuIsOpened) {
      this.profileMenuIsOpened = false;
    } else {
      this.profileMenuIsOpened = true;
    }
  }

}
