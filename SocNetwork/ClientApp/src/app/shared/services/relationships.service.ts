import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ShortProfilesResponse, Relationship, RelationshipResponse } from "../interfaces";

@Injectable() 
export class RelationshipsService {

    constructor(
        private http: HttpClient
    ) {}

    getRelationshipWith(username: string): Observable<Relationship> {
        return this.http.get<RelationshipResponse>(`${environment.apiUrl}/relationships/with/${username}`)
        .pipe(
            map((response: RelationshipResponse) => response.relationship)
        );
    }

    follow(username: string) {        
        return this.http.put(`${environment.apiUrl}/relationships/follow/${username}`, null);
    }

    unfollow(username: string) {        
        return this.http.delete(`${environment.apiUrl}/relationships/unfollow/${username}`);
    }
}