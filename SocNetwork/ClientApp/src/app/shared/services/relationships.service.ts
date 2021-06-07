import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ShortProfilesResponse, UserRelationship } from "../interfaces";

@Injectable({ providedIn: 'root' }) 
export class RelationshipsService {

    constructor(
        private http: HttpClient
    ) {}

    getRelationshipWith(username: string): Observable<UserRelationship> {
        return this.http.get<UserRelationship>(`${environment.apiUrl}/users/relationship-with/${username}`);
    }

    follow(username: string) {        
        return this.http.put(`${environment.apiUrl}/users/follow/${username}`, null);
    }

    unfollow(username: string) {        
        return this.http.delete(`${environment.apiUrl}/users/unfollow/${username}`);
    }
}