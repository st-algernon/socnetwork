import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ShortProfile } from 'src/app/shared/interfaces';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-followers-page',
  templateUrl: './followers-page.component.html',
  styleUrls: ['./followers-page.component.css']
})
export class FollowersPageComponent implements OnInit {

  username: string;
  followers: ShortProfile[];
  subs: Subscription[] = [];

  constructor(
    private usersService: UsersService,
    private router: Router
  ){ }

  ngOnInit() {

    const urlTree = this.router.parseUrl(this.router.url);
    this.username = urlTree.root.children.primary.segments[0].path;

    if (this.username) {
      this.subs.push( 

        this.usersService.getFollowers(this.username, { number: 1, size: 15 })
          .subscribe((response: ShortProfile[]) => { 
            this.followers = response;
          })

      );
    }
  }

  ngOnDestroy() {
    this.subs.forEach(s => {
      s.unsubscribe();
    });
  }

}
