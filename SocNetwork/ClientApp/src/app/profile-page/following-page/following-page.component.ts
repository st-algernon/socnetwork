import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class FollowingPageComponent implements OnInit, OnDestroy {

  username: string;
  following: Profile[];
  subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.subs.push( 

      this.route.params.pipe(
        switchMap((params: Params) => {
          this.username = params['username'];
          return this.usersService.getFollowing(params['username'], { number: 1, size: 15});
        })
      ).subscribe((profiles: Profile[]) => { 
        console.log(profiles);
        this.following = profiles;
      })

    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => {
      s.unsubscribe();
    });
  }
}
