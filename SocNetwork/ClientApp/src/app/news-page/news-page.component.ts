import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostComponent } from '../shared/components/post/post.component';
import { ContainerDirective } from '../shared/directives/container.directive';
import { Post, ShortProfile } from '../shared/interfaces';
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

  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
  ) { }

  ngOnInit() {
    this.subs.push(
      this.usersService.me$.subscribe((shortProfile: ShortProfile) => this.me = shortProfile),

      this.postsService.getFeed({ number: 1, size: 15 }).subscribe((posts: Post[]) => {
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
    this.posts.push($event);
  }
}
