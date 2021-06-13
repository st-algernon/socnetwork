import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable, ReplaySubject } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { MediaFor } from "../enums";
import { 
    EditProfileInfoRequest, ProfileMedia, Profile, 
    Media, MediaResponse, ProfileResponse,
    ShortProfile, ShortProfilesResponse, Relationship, PageParams 
} from "../interfaces";

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

    getFollowers(username: string, usersPageParams: PageParams): Observable<ShortProfile[]> {
        const params = new HttpParams()
        .set('Number', usersPageParams.number.toString())
        .set('Size', usersPageParams.size.toString());

        return this.http.get<ShortProfilesResponse>(`${environment.apiUrl}/users/${username}/followers`, { params })
        .pipe(
            map((response: ShortProfilesResponse) => response.shortProfiles )
        )
    }

    getFollowing(username: string, usersPageParams: PageParams): Observable<ShortProfile[]> {
        const params = new HttpParams()
        .set('Number', usersPageParams.number.toString())
        .set('Size', usersPageParams.size.toString());

        return this.http.get<ShortProfilesResponse>(`${environment.apiUrl}/users/${username}/following`, { params })
        .pipe(
            map((response: ShortProfilesResponse) => response.shortProfiles)
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
            })
        )
    }

    getShortProfile(username: string): Observable<ShortProfile> {
        return this.http.get<ShortProfilesResponse>(`${environment.apiUrl}/users/${username}`)
        .pipe(
            map((response: ShortProfilesResponse) => response.shortProfiles),
            map((shortProfiles: ShortProfile[]) => { 
                return { 
                    ...shortProfiles[0],
                    lastVisited: new Date(shortProfiles[0].lastVisited)
                }
            })
        );
    }

    getMyShortProfile(): Observable<ShortProfile> {
        return this.http.get<ShortProfilesResponse>(`${environment.apiUrl}/users/current`)
        .pipe(
            map((response: ShortProfilesResponse) => response.shortProfiles[0])
        );
    }

    getFollowOffers(): Observable<ShortProfile[]> {
        return this.http.get<ShortProfilesResponse>(`${environment.apiUrl}/users/suggestions`)
        .pipe(
            map((response: ShortProfilesResponse) => response.shortProfiles)
        );
    }

    editProfile(editProfileInfoRequest: EditProfileInfoRequest) {
        return this.http.put(`${environment.apiUrl}/users/edit`, editProfileInfoRequest);
    }

    // private getCurrentAvatar(profile): ProfileMedia {
    //     return profile.profileMediaDTOs.forEach(m => m.isCurrent == true && m.mediaFor == MediaFor.Avatar);
    // }

    // private getCurrentCover(profile): ProfileMedia {
    //     return profile.profileMediaDTOs.forEach(m => m.isCurrent == true && m.mediaFor == MediaFor.Cover);
    // }
}
