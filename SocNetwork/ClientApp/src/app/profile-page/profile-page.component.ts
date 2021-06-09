import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MediaFor, UserRelationshipType } from '../shared/enums';
import { Profile, ShortChat, ShortProfile, UserRelationship } from '../shared/interfaces';
import { MediaService } from '../shared/services/media.service';
import { MessengerHub } from '../shared/hubs/messenger.hub';
import { UsersService } from '../shared/services/users.service';
import { RelationshipsService } from '../shared/services/relationships.service';
import { ChatsService } from '../shared/services/chats.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, OnDestroy, AfterContentChecked{

  user: Profile;
  me: ShortProfile;  

  editProfileFlag: boolean = false;
  isMe: boolean = false;
  isFollowed: boolean = false;
  isUnFollowed: boolean = false;

  subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private chatsService: ChatsService,
    private relationshipsService: RelationshipsService,
    private messengerHub: MessengerHub
    ) { }

  ngOnInit(): void {

    this.subs.push(
      
      this.usersService.me$.subscribe((shortProfile: ShortProfile) => this.me = shortProfile),

      this.route.params.pipe(
        switchMap((params: Params) => {
          return this.usersService.getProfile(params['username']);
        })
      ).subscribe((profile: Profile) => { 
        console.log(profile);
        this.user = profile;
      }),
    
      this.route.params.pipe(
        switchMap((params: Params) => {
          return this.relationshipsService.getRelationshipWith(params['username']);
        })
      ).subscribe((userRelationship: UserRelationship) => {
        if (userRelationship.userRelationshipType == UserRelationshipType.Followed) {
          this.isFollowed = true;
        }
        if (userRelationship.userRelationshipType == UserRelationshipType.UnFollowed) {
          this.isUnFollowed = true;
        }
      })
    
    );

    // this.messengerHub.startConnection();
    // this.messengerHub.addReceivedMessageListener();
  }

  ngOnDestroy() {
    this.subs.forEach(
      s => s.unsubscribe()
    );
  }

  ngAfterContentChecked(): void {
    if (this.me?.id == this.user?.id) {
      this.isMe = true;
    }
  }

  openChat() {
    this.subs.push(

      this.chatsService.getShortChatWith(this.user.id)
      .subscribe((shortChat: ShortChat) => {
        this.router.navigate(['messenger', 'chat', shortChat.id]);
      })
      
    );
  }

  follow() {
    this.subs.push( 

      this.route.params.pipe(
        switchMap((params: Params) => {
          return this.relationshipsService.follow(params['username']);
        })
      ).subscribe(() => { 
        this.isFollowed = true;
        this.isUnFollowed = false;
      })

    );
  }

  unfollow() {
    this.subs.push( 

      this.route.params.pipe(
        switchMap((params: Params) => {
          return this.relationshipsService.unfollow(params['username']);
        })
      ).subscribe(() => { 
        this.isUnFollowed = true;
        this.isFollowed = false;
      })

    );
  }

  changeTitleToUnfollow($event: MouseEvent) {
    ($event.target as HTMLElement).innerText = $event.type == "mouseover" ? "Unfollow" : "Following";
  }
}
