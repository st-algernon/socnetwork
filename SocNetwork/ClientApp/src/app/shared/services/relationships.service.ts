import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ShortProfilesResponse, UserRelationship } from "../interfaces";

@Injectable() 
export class RelationshipsService {

    constructor(
        private http: HttpClient
    ) {}

    getRelationshipWith(username: string): Observable<UserRelationship> {
        return this.http.get<UserRelationship>(`${environment.apiUrl}/relationships/with/${username}`);
    }

    follow(username: string) {        
        return this.http.put(`${environment.apiUrl}/relationships/follow/${username}`, null);
    }

    unfollow(username: string) {        
        return this.http.delete(`${environment.apiUrl}/relationships/unfollow/${username}`);
    }
}