import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, ReplaySubject } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { MediaFor } from "../enums";
import { EditProfileInfoRequest, Profile, ProfileMediaResponse, ProfileResponse, UserRelationship, UsersPageParams } from "../interfaces";

@Injectable({ providedIn: 'root' }) 
export class UsersService {

    private _me$ = new ReplaySubject<Profile>();
    
    get me$(): ReplaySubject<Profile> {

        if (localStorage.me == null) {
            this.getMyUsername()
            .pipe(
                switchMap((response: { username: string }) => {
                    return this.getProfile(response.username)
                })
            ).subscribe(
                (response: Profile) => {
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

    constructor(
        private http: HttpClient
    ) {}

    getAll() {
        return this.http.get(`${environment.apiUrl}/users`)
        .pipe(tap(console.log));
    }

    getFollowers(username: string) {
        return this.http.get(`${environment.apiUrl}/users/${username}/followers`)
    }

    getFollowing(username: string, usersPageParams?: UsersPageParams) {
        const params = new HttpParams().set('Number', usersPageParams?.number.toString()).set('Size', usersPageParams?.size.toString());

        return this.http.get(`${environment.apiUrl}/users/${username}/following`, { params })
    }

    getProfile(username: string) {
        return this.http.get<ProfileResponse>(`${environment.apiUrl}/users/${username}`)
        .pipe(
            map((response: ProfileResponse) => { 
                return { 
                    ...response.profile,
                    birthDate: new Date(response.profile.birthDate),
                    creationDate: new Date(response.profile.creationDate),
                    lastVisited: new Date(response.profile.lastVisited),
                    currentAvatarPath: response.profile.mediaDTO.find(m => m.isCurrent == true && m.mediaFor == MediaFor.Avatar)?.path,
                    currentCoverPath: response.profile.mediaDTO.find(m => m.isCurrent == true && m.mediaFor == MediaFor.Cover)?.path
                }
            })
        )
    }

    getMyUsername() {
        return this.http.get(`${environment.apiUrl}/users/me`);
    }

    getProfileMedia(username: string) {
        return this.http.get<ProfileMediaResponse>(`${environment.apiUrl}/media/profile/${username}`)
        .pipe(
          map((response: ProfileMediaResponse) => { return response.media })
        )
    }

    getRelationshipWith(username: string) {
        return this.http.get<UserRelationship>(`${environment.apiUrl}/users/relationship-with/${username}`);
    }

    editProfile(editProfileInfoRequest: EditProfileInfoRequest) {
        return this.http.put(`${environment.apiUrl}/users/edit`, editProfileInfoRequest);
    }

    follow(username: string) {        
        return this.http.put(`${environment.apiUrl}/users/follow/${username}`, null);
    }

    unfollow(username: string) {        
        return this.http.delete(`${environment.apiUrl}/users/unfollow/${username}`);
    }
}
