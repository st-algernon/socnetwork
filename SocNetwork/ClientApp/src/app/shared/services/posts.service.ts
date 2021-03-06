import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Comment, CommentRequest, CommentsResponse, PageParams, Post, PostRequest, PostsResponse, Tag, TagsResponse } from "../interfaces";


@Injectable()
export class PostsService {
  constructor(
    private http: HttpClient
  ) {}
  
  savePost(request: PostRequest): Observable<Post> {
    return this.http.post<PostsResponse>(`${environment.apiUrl}/posts`, request)
    .pipe(
      map((response: PostsResponse) => response.posts[0])
    )
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<PostsResponse>(`${environment.apiUrl}/posts/${id}`)
    .pipe(
        map((response: PostsResponse) => response.posts[0])
    );
  }

  getFeed(page: number, size?: number): Observable<Post[]> {
    const params = new HttpParams()
    .set('Number', page.toString())
    .set('Size', size ? size.toString() : '15');

    return this.http.get<PostsResponse>(`${environment.apiUrl}/posts/feed`, { params })
    .pipe(
        map((response: PostsResponse) => response.posts )
    )
  }

  getPostsForExplore(page: number, size?: number): Observable<Post[]> {
    const params = new HttpParams()
    .set('Number', page.toString())
    .set('Size', size ? size.toString() : '15');

    return this.http.get<PostsResponse>(`${environment.apiUrl}/posts/explore`, { params })
    .pipe(
        map((response: PostsResponse) => response.posts )
    )
  }

  getPosts(username: string, page: number, size?: number): Observable<Post[]> {
    const params = new HttpParams()
    .set('Number', page.toString())
    .set('Size', size ? size.toString() : '15');

    return this.http.get<PostsResponse>(`${environment.apiUrl}/posts/user/${username}`, { params })
    .pipe(
        map((response: PostsResponse) => response.posts )
    )
  }

  getPostsByTag(tag: string): Observable<Post[]> {
    return this.http.get<PostsResponse>(`${environment.apiUrl}/posts/tag/${tag}`)
    .pipe(
        map((response: PostsResponse) => response.posts)
    );
  }

  saveComment(request: CommentRequest): Observable<Comment> {
    return this.http.post<CommentsResponse>(`${environment.apiUrl}/posts/comment`, request)
    .pipe(
      map((response: CommentsResponse) => response.comments[0])
    )
  }

  getComments(postId: string): Observable<Comment[]> {
    return this.http.get<CommentsResponse>(`${environment.apiUrl}/posts/${postId}/comments`)
    .pipe(
      map((response: CommentsResponse) => response.comments)
    )
  }
}
