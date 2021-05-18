import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Profile, ProfilesResponse } from 'src/app/shared/interfaces';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-followers-page',
  templateUrl: './followers-page.component.html',
  styleUrls: ['./followers-page.component.css']
})
export class FollowersPageComponent implements OnInit {

  username: string;
  followers: Profile[];

  followersSub: Subscription;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ){ }

  ngOnInit() {
    this.followersSub = this.route.params.pipe(
      switchMap((params: Params) => {
        this.username = params['username'];
        return this.usersService.getFollowers(params['username']);
      })
    ).subscribe((response: ProfilesResponse) => { 
      this.followers = response.profiles;
      console.log(this.followers);
    });
  }

}
