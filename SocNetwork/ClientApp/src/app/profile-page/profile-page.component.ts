import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MediaFor, UserRelationshipType } from '../shared/enums';
import { Profile, UserRelationship } from '../shared/interfaces';
import { MediaService } from '../shared/services/media.service';
import { MessengerHub } from '../shared/hubs/messenger.hub';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, OnDestroy, AfterContentChecked{

  user: Profile;
  me: Profile;  

  editProfileFlag: boolean = false;
  isMe: boolean = false;
  isFollowed: boolean = false;
  isUnFollowed: boolean = false;

  userSub: Subscription;
  meSub: Subscription;
  urSub: Subscription;
  followSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private messengerHub: MessengerHub
    ) { }

  ngOnInit(): void {
    this.meSub = this.usersService.me$.subscribe((response: Profile) => this.me = response);

    this.userSub = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.usersService.getProfile(params['username']);
      })
    ).subscribe((response: Profile) => { 
      console.log(response);
      this.user = response;
    });

    this.urSub = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.usersService.getRelationshipWith(params['username']);
      })
    ).subscribe((response: UserRelationship) => {
      if (response.userRelationshipType == UserRelationshipType.Followed) {
        this.isFollowed = true;
      }
      if (response.userRelationshipType == UserRelationshipType.UnFollowed) {
        this.isUnFollowed = true;
      }
    });

    this.messengerHub.startConnection();
    this.messengerHub.addReceivedMessageListener();
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.meSub?.unsubscribe();
    this.urSub?.unsubscribe();
    this.followSub?.unsubscribe();
  }

  ngAfterContentChecked(): void {

    if (this.me?.id == this.user?.id) {
      this.isMe = true;
    }
  }

  openChat() {
    this.router.navigate(['messenger', 'chat', this.user.id]);
  }

  follow() {
    this.followSub = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.usersService.follow(params['username']);
      })
    ).subscribe(() => { 
      this.isFollowed = true;
      this.isUnFollowed = false;
    });
  }

  unfollow() {
    this.followSub = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.usersService.unfollow(params['username']);
      })
    ).subscribe(() => { 
      this.isUnFollowed = true;
      this.isFollowed = false;
    });
  }

  changeTitleToUnfollow($event: MouseEvent) {
    ($event.target as HTMLElement).innerText = $event.type == "mouseover" ? "Unfollow" : "Following";
  }
}
