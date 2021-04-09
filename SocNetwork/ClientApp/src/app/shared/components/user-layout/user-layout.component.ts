import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../../interfaces';
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

  user: User;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.route.params.pipe (
      switchMap((params: Params) => {
        return this.usersService.getByUsername(params['username']);
      })
    ).subscribe((response: User) => {
      this.user = response;
      console.log(this.user);
    });
  }

}
