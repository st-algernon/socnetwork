import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post, ShortProfile } from '../shared/interfaces';
import { PostsService } from '../shared/services/posts.service';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css']
})
export class ExplorePageComponent implements OnInit, OnDestroy { 

  me: ShortProfile;
  posts: Post[];
  page: number = 1;
  subs: Subscription[] = [];

  constructor(
    private postsService: PostsService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.subs.push(

      this.usersService.me$.subscribe((user: ShortProfile) => {
        this.me = user;
      }),

      this.postsService.getPostsForExplore(this.page)
        .subscribe((posts: Post[]) => {
          this.posts = posts;
        }
      )

    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => {
      s.unsubscribe();
    });
  }

  onScroll() {
    this.subs.push(

      this.postsService.getPostsForExplore(++this.page).subscribe((posts: Post[]) => {
        console.log(posts);
        this.posts.push(...posts);
      })

    );
  }
}
