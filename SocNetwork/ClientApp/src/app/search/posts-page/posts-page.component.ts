import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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
  searchedPosts: Post[];

  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.usersService.me$.subscribe((shortProfile: ShortProfile) => this.me = shortProfile)

    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getPostsByTag(params['content']);
      })
    ).subscribe((posts: Post[]) => {
      console.log(posts);
      this.searchedPosts = posts;
    });
  }

}
