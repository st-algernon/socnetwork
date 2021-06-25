import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Post, PostsResponse, Tag, TagsResponse } from "../interfaces";

@Injectable()
export class TagsService {
  constructor(
    private http: HttpClient
  ) {}

  getTrends(): Observable<Tag[]> {
    return this.http.get<TagsResponse>(`${environment.apiUrl}/tags/trends`)
    .pipe(
        map((response: TagsResponse) => response.tags)
    );
  }

  getWantedTags(content: string): Observable<Tag[]> {
    return this.http.get<TagsResponse>(`${environment.apiUrl}/tags/search/${content}`)
    .pipe(
        map((response: TagsResponse) => response.tags)
    );
  }
}