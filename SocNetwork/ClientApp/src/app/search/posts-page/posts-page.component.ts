import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostsHub } from 'src/app/shared/hubs/posts.hub';
import { Post, ShortProfile } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/services/posts.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.css']
})
export class PostsPageComponent implements OnInit {

  me: ShortProfile;
  wantedPosts: Post[];
  searchSeed: string;
  subs: Subscription[] = [];

  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private postsHub: PostsHub
  ) { }

  ngOnInit(): void {
    this.postsHub.startConnection();
    this.postsHub.addReceivedPostLikesListener();

    this.subs.push(

    this.usersService.me$.subscribe((shortProfile: ShortProfile) => this.me = shortProfile),

    this.route.params.pipe(
      switchMap((params: Params) => {
        this.searchSeed = '#' + params['content'];
        return this.postsService.getPostsByTag(params['content']);
      })
    ).subscribe((posts: Post[]) => {
      this.wantedPosts = posts;
    })

    );
  }

  search($event) {
    console.log($event);
    this.subs.push(

      this.postsService.getPostsByTag($event.value).subscribe((posts: Post[]) => {
        console.log(posts);
        this.wantedPosts = posts;
      })

    );
  }

  // navigateToFoo(){
  //   // changes the route without moving from the current view or
  //   // triggering a navigation event,
  //   this.router.navigate([], {
  //    relativeTo: this.router,
  //    queryParams: {
  //      query: '123'
  //    },
  //    queryParamsHandling: 'merge',
  //    skipLocationChange: true
  //  });

  // }

}
