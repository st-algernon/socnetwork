import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MediaFor, NotificType, SubjectType, UserRelationshipType } from '../shared/enums';
import { Profile, ShortChat, ShortProfile, Relationship, Post, NotificRequest } from '../shared/interfaces';
import { MediaService } from '../shared/services/media.service';
import { UsersService } from '../shared/services/users.service';
import { RelationshipsService } from '../shared/services/relationships.service';
import { ChatsService } from '../shared/services/chats.service';
import { PostsService } from '../shared/services/posts.service';
import { NotificationsHub } from '../shared/hubs/notifications.hub';
import { MaritalStatusOptions } from '../shared/enums-options';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, OnDestroy, AfterContentChecked{
  
  me: ShortProfile;
  user: { 
    profile: Profile | null,
    posts: Post[] | null
  };
  relationship: {
    isMe: boolean,
    isUnFollowed: boolean,
    isFollowed: boolean,
    isBlocked: boolean
  };
  postsPage: number = 1;
  subs: Subscription[] = [];
  editProfileFlag: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private chatsService: ChatsService,
    private postsService: PostsService,
    private relationshipsService: RelationshipsService,
    private notificsHub: NotificationsHub
    ) { 
      this.user = {
        profile: null,
        posts: null
      };

      this.relationship = {
        isMe: false,
        isUnFollowed: false,
        isFollowed: false,
        isBlocked: false
      };
    }

  ngOnInit(): void {

    this.subs.push(
      
      this.usersService.me$.subscribe((shortProfile: ShortProfile) => this.me = shortProfile),

      this.route.params.subscribe((params: Params) => {
        this.subs.push(
          this.usersService.getProfile(params['username']).subscribe(
            (profile: Profile) => {
              this.user.profile = profile;
            }
          ),
          this.relationshipsService.getRelationshipWith(params['username']).subscribe(
            (relationship: Relationship) => {
              this.defineRelationship(relationship);
            }
          ),
          this.postsService.getPosts(params['username'], this.postsPage).subscribe(
            (posts: Post[]) => {
              console.log(posts);
              this.user.posts = posts;
            }
          )
        );
      })

    );
  }

  ngOnDestroy() {
    this.subs.forEach(
      s => s.unsubscribe()
    );
  }

  ngAfterContentChecked(): void {
    if (this.me?.id == this.user.profile?.id) {
      this.relationship.isMe = true;
    }
  }

  openChat() {
    this.subs.push(

      this.chatsService.getShortChatWith(this.user.profile.id)
      .subscribe((shortChat: ShortChat) => {
        this.router.navigate(['messenger', 'chat', shortChat.id]);
      })
      
    );
  }

  follow() {
    this.subs.push( 

      this.relationshipsService.follow(this.user.profile.username).subscribe(() => { 
        const request: NotificRequest = { 
          recipientId: this.user.profile.id,
          subjectId: '',
          subjectType: SubjectType.None,
          notificType: NotificType.Followed
        };

        this.notificsHub.notify(request)
        this.relationship.isFollowed = true;
        this.relationship.isUnFollowed = false;
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
        this.relationship.isUnFollowed = true;
        this.relationship.isFollowed = false;
      })

    );
  }

  addNewPost($event: Post) {
    this.user.posts.unshift($event);
  }

  changeTitleToUnfollow($event: MouseEvent) {
    ($event.target as HTMLElement).innerText = $event.type == "mouseover" ? "Не стежити" : "Відстежується";
  }

  defineRelationship(relationship: Relationship) {
    if (relationship.userRelationshipType == UserRelationshipType.Followed) {
      this.relationship.isFollowed = true;
    }
    if (relationship.userRelationshipType == UserRelationshipType.UnFollowed) {
      this.relationship.isUnFollowed = true;
    }
    if (relationship.userRelationshipType == UserRelationshipType.Blocked) {
      this.relationship.isBlocked = true;
    }
  }

  onScroll() {
    this.subs.push(

      this.postsService.getPosts(this.user.profile.username, ++this.postsPage).subscribe((posts: Post[]) => {
        console.log(posts);
        this.user.posts.push(...posts);
      })

    );
  }

  // getMaritalStatus(): string {
  //   return MaritalStatusOptions.find(t => t.key == this.user.profile.maritalStatus).value;
  // }
}
