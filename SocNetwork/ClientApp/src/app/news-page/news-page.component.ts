import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostComponent } from '../shared/components/post/post.component';
import { ContainerDirective } from '../shared/directives/container.directive';
import { PostsHub } from '../shared/hubs/posts.hub';
import { PageParams, Post, ShortProfile } from '../shared/interfaces';
import { PostsService } from '../shared/services/posts.service';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit, OnDestroy {
  me: ShortProfile;
  subs: Subscription[] = [];
  posts: Post[];
  page: number = 1;

  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
    private postsHub: PostsHub
  ) { }

  ngOnInit() {
    this.postsHub.startConnection();
    this.postsHub.addReceivedPostLikesListener();
    this.postsHub.addReceivedCommentLikesListener();

    this.subs.push(
      this.usersService.me$.subscribe((shortProfile: ShortProfile) => this.me = shortProfile),

      this.postsService.getFeed(this.page).subscribe((posts: Post[]) => {
        console.log(posts);
        this.posts = posts;
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => {
      s.unsubscribe();
    });
  }

  addNewPost($event: Post) {
    this.posts.unshift($event);
  }

  onScroll() {
    this.subs.push(

      this.postsService.getFeed(++this.page).subscribe((posts: Post[]) => {
        console.log(posts);
        this.posts.push(...posts);
      })

    );
  }
}
