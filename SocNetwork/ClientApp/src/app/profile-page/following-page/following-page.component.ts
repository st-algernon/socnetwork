import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Profile, ProfilesResponse } from 'src/app/shared/interfaces';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-following-page',
  templateUrl: './following-page.component.html',
  styleUrls: ['./following-page.component.css']
})
export class FollowingPageComponent implements OnInit {

  username: string;
  following: Profile[];

  followingSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    // this.followingSub = 
    this.route.params.pipe(
      switchMap((params: Params) => {
        this.username = params['username'];
        return this.usersService.getFollowing(params['username'], { number: 1, size: 15});
      })
    )
    // .subscribe((response: ProfilesResponse) => { 
    //   console.log(response);
    //   this.following = response.profiles;
    // });
  }

}
