import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User, UsersResponse } from '../shared/interfaces';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, AfterContentChecked {

  user: User;
  me: User;  

  editProfileFlag: boolean = false;
  itIsMe: boolean = false;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
    ) { }

  ngOnInit(): void {
    this.usersService.me$.subscribe((response: User) => this.me = response);

    this.sub = this.route.params.pipe (
      switchMap((params: Params) => {
        return this.usersService.getByUsername(params['username']);
      })
    ).subscribe((response: User) => {
      this.user = response;
    });
  }

  ngAfterContentChecked(): void {

    if (this.me != null && this.user != null) {
      if (this.me.id == this.user.id) {
        this.itIsMe = true;
      }
    }
  }
}
