import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Profile, ProfilesResponse } from 'src/app/shared/interfaces';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-following-followers-page',
  templateUrl: './following-followers-page.component.html',
  styleUrls: ['./following-followers-page.component.css']
})
export class FollowingFollowersPageComponent implements OnInit {

  username: string;
  following: Profile[];
  followers: Profile[];
  followingSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.followingSub = this.route.params.pipe(
      switchMap((params: Params) => {
        this.username = params['username'];

        const following$ = this.usersService.getFollowing(this.username);
        const followers$ = this.usersService.getFollowers(this.username);
        return combineLatest(following$, followers$);
      })
    ).subscribe(([following, followers]) => { 
      // this.following = following.profiles;
      // this.followers = followers.profiles;
    });
  }

}
