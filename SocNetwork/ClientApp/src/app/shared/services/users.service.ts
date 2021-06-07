import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable, ReplaySubject } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { MediaFor } from "../enums";
import { EditProfileInfoRequest, Media, ShortProfileResponse, Profile, ProfileMedia, ProfileMediaResponse, ProfileResponse, ProfilesResponse, ShortProfile, ShortProfilesResponse, UserRelationship, UsersPageParams } from "../interfaces";

@Injectable({ providedIn: 'root' }) 
export class UsersService {

    private _me$ = new ReplaySubject<ShortProfile>();
    
    get me$(): ReplaySubject<ShortProfile> {

        if (localStorage.me == null) {
            this.getMyShortProfile().subscribe(
                (shortProfile: ShortProfile) => {
                    localStorage.me = JSON.stringify(shortProfile);
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

    getFollowers(username: string, usersPageParams?: UsersPageParams): Observable<ShortProfile[]> {
        const params = new HttpParams()
        .set('Number', usersPageParams?.number.toString())
        .set('Size', usersPageParams?.size.toString());

        return this.http.get<ShortProfilesResponse>(`${environment.apiUrl}/users/${username}/followers`, { params })
        .pipe(
            map((response: ShortProfilesResponse) => response.shortProfiles )
        )
    }

    getFollowing(username: string, usersPageParams?: UsersPageParams): Observable<ShortProfile[]> {
        const params = new HttpParams()
        .set('Number', usersPageParams?.number.toString())
        .set('Size', usersPageParams?.size.toString());

        return this.http.get<ShortProfilesResponse>(`${environment.apiUrl}/users/${username}/following`, { params })
        .pipe(
            map((response: ShortProfilesResponse) => response.shortProfiles )
        )
    }

    getProfile(username: string): Observable<Profile> {
        return this.http.get<ProfileResponse>(`${environment.apiUrl}/users/${username}`)
        .pipe(
            map((response: ProfileResponse) => { 
                return { 
                    ...response.profile,
                    birthDate: new Date(response.profile.birthDate),
                    creationDate: new Date(response.profile.creationDate),
                    lastVisited: new Date(response.profile.lastVisited)
                }
            }),
            map((profile: Profile) => this.completeProfile(profile))
        )
    }

    getShortProfile(username: string): Observable<ShortProfile> {
        return this.http.get<ShortProfileResponse>(`${environment.apiUrl}/users/${username}`)
        .pipe(
            map((response: ShortProfileResponse) => { 
                return { 
                    ...response.shortProfile,
                    lastVisited: new Date(response.shortProfile.lastVisited)
                }
            })
        );
    }

    getMyShortProfile(): Observable<ShortProfile> {
        return this.http.get<ShortProfileResponse>(`${environment.apiUrl}/users/me`)
        .pipe(
            map((response: ShortProfileResponse) => response.shortProfile)
        );
    }

    getProfileMedia(username: string): Observable<ProfileMedia[]> {
        return this.http.get<ProfileMediaResponse>(`${environment.apiUrl}/media/profile/${username}`)
        .pipe(
          map((response: ProfileMediaResponse) => response.media)
        )
    }

    editProfile(editProfileInfoRequest: EditProfileInfoRequest) {
        return this.http.put(`${environment.apiUrl}/users/edit`, editProfileInfoRequest);
    }

    private completeProfile(user: Profile): Profile {
        return {
            ...user,
            currentAvatarPath: user.mediaDTO.find(m => m.isCurrent == true && m.mediaFor == MediaFor.Avatar)?.path,
            currentCoverPath: user.mediaDTO.find(m => m.isCurrent == true && m.mediaFor == MediaFor.Cover)?.path
        }
    }
}
