import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post, ShortProfile } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/services/posts.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit, OnDestroy {

  me: ShortProfile;
  post: Post
  subs: Subscription[] = [];

  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subs.push(
      this.usersService.me$.subscribe((shortProfile: ShortProfile) => this.me = shortProfile),

      this.route.params.pipe(
        switchMap((params: Params) => {
          return this.postsService.getPostById(params['id']);
        })
      ).subscribe((post: Post) => {
        this.post = post;
      })

    )
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => {
      s.unsubscribe();
    });
  }

}
