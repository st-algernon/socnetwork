import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { EditProfileRequest, User, UsersResponse } from "../interfaces";

@Injectable({ providedIn: 'root' }) 
export class UsersService {

    private _me$ = new ReplaySubject<User>();
    
    get me$(): ReplaySubject<User> {

        if (localStorage.me == null) {
            this.getMe().subscribe(
                (response: User) => {
                    localStorage.me = JSON.stringify(response);
                },
                (error) => {
                    console.log(error);
                },
                () => { 
                    this._me$.next(JSON.parse(localStorage.me));
                }
            );
        } else {
            this._me$.next(JSON.parse(localStorage.me));
        }

        return this._me$;
    }

    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get(`${environment.apiUrl}/users`)
        .pipe(tap(console.log));
    }

    getFollowers(username: string) {
        return this.http.get(`${environment.apiUrl}/users/${username}/followers`)
    }

    getByUsername(username: string) {
        return this.http.get<UsersResponse>(`${environment.apiUrl}/users/${username}`)
        .pipe(
            map((response: UsersResponse) => { 
                return { 
                    ...response.users[0],
                    birthDate: new Date(response.users[0].birthDate),
                    creationDate: new Date(response.users[0].creationDate),
                    lastVisited: new Date(response.users[0].lastVisited),
                    // pathToAvatar: location.origin + "/" + response.users[0].pathToAvatar,
                    // pathToCover: location.origin + "/" + response.users[0].pathToCover,
                }
             })
        );
    }

    editProfile(editProfileRequest: EditProfileRequest) {
        return this.http.put(`${environment.apiUrl}/users`, editProfileRequest);
    }

    private getMe() {
        return this.http.get(`${environment.apiUrl}/users/me`)
        .pipe(
            map((response: UsersResponse) => { 
                return { 
                    ...response.users[0],
                    birthDate: new Date(response.users[0].birthDate),
                    creationDate: new Date(response.users[0].creationDate),
                    lastVisited: new Date(response.users[0].lastVisited),
                    // pathToAvatar: location.origin + "/" + response.users[0].pathToAvatar,
                    // pathToCover: location.origin + "/" + response.users[0].pathToCover,
                }
            })
        );
    }
}
