import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MediaFor } from '../shared/enums';
import { Profile } from '../shared/interfaces';
import { MediaService } from '../shared/services/media.service';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, AfterContentChecked{

  user: Profile;
  me: Profile;  

  editProfileFlag: boolean = false;
  itIsMe: boolean = false;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
    ) { }

  ngOnInit(): void {
    this.usersService.me$.subscribe((response: Profile) => this.me = response);

    this.sub = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.usersService.getProfile(params['username']);
      })
    ).subscribe((response: Profile) => { 
      console.log(response);
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
