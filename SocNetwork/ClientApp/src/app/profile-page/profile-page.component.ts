import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MediaFor } from '../shared/enums';
import { User } from '../shared/interfaces';
import { MediaService } from '../shared/services/media.service';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, AfterContentChecked{

  user: User = { userInfo: null, media: null};
  me: User = { userInfo: null, media: null};  

  editProfileFlag: boolean = false;
  itIsMe: boolean = false;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
    ) { }

  ngOnInit(): void {
    this.usersService.me$.subscribe((response: User) => this.me = response);

    this.sub = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.usersService.getUser(params['username']);
      })
    ).subscribe(({ profileInfo, profileMedia}) => { 
      this.user.profileInfo = profileInfo;
      this.user.media = profileMedia;
    });
  }

  ngAfterContentChecked(): void {

    if (this.me.profileInfo != null && this.user.profileInfo != null) {
      if (this.me.profileInfo.id == this.user.profileInfo.id) {
        this.itIsMe = true;
      }
    }
  }

  getPathToCurrentAvatar() {
    return this.user.media.find(m => m.isCurrent == true && m.mediaFor == MediaFor.Avatar).path;
  }

  getPathToCurrentCover() {
    return this.user.media.find(m => m.isCurrent == true && m.mediaFor == MediaFor.Cover).path;
  }
}
