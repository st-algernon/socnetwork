import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, UrlSegmentGroup } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ShortProfile } from 'src/app/shared/interfaces';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-following-page',
  templateUrl: './following-page.component.html',
  styleUrls: ['./following-page.component.css']
})
export class FollowingPageComponent implements OnInit, OnDestroy {

  username: string;
  following: ShortProfile[];
  subs: Subscription[] = [];

  constructor(
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() {

    const urlTree = this.router.parseUrl(this.router.url);
    this.username = urlTree.root.children.primary.segments[0].path;

    this.subs.push( 

      this.usersService.getFollowing(this.username, { number: 1, size: 15 })
      .subscribe((response: ShortProfile[]) => { 
        this.following = response;
      })

    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => {
      s.unsubscribe();
    });
  }

  changeTitleToUnfollow($event: MouseEvent) {
    ($event.target as HTMLElement).innerText = $event.type == "mouseover" ? "Не стежити" : "Відстежується";
  }
}
