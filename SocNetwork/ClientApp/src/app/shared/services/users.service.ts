import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, ReplaySubject } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { EditProfileRequest, User, UserInfoResponse } from "../interfaces";
import { MediaService } from "./media.service";

@Injectable({ providedIn: 'root' }) 
export class UsersService {

    private _me$ = new ReplaySubject<User>();
    
    get me$(): ReplaySubject<User> {

        if (localStorage.me == null) {
            this.getMyUsername()
            .pipe(
                switchMap((response: { username: string }) => {
                    console.log('switchMap', response)
                    return this.getUser(response.username)
                })
            ).subscribe(
                ({ profileInfo, profileMedia }) => {
                    localStorage.me = JSON.stringify({ profileInfo, profileMedia });
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

    constructor(
        private http: HttpClient,
        private mediaService: MediaService
    ) {}

    getAll() {
        return this.http.get(`${environment.apiUrl}/users`)
        .pipe(tap(console.log));
    }

    getFollowers(username: string) {
        return this.http.get(`${environment.apiUrl}/users/${username}/followers`)
    }

    getProfileInfo(username: string) {
        return this.http.get<UserInfoResponse>(`${environment.apiUrl}/users/${username}`)
        .pipe(
            map((response: UserInfoResponse) => { 
                return { 
                    ...response.userInfo,
                    birthDate: new Date(response.userInfo.birthDate),
                    creationDate: new Date(response.userInfo.creationDate),
                    lastVisited: new Date(response.userInfo.lastVisited)
                }
            })
        )
    }

    getUser(username: string) {
        return forkJoin({
            profileInfo: this.getProfileInfo(username),
            profileMedia: this.mediaService.getProfileMedia(username)
        });
    }

    editProfile(editProfileRequest: EditProfileRequest) {
        return this.http.put(`${environment.apiUrl}/users`, editProfileRequest);
    }

    getMyUsername() {
        return this.http.get(`${environment.apiUrl}/users/me`).pipe(tap(console.log))
    }
}
