import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject, Subscription } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User, UsersResponse } from "../interfaces";

@Injectable({ providedIn: 'root' }) 
export class MeStorage {

    sub: Subscription;

    private _me$ = new ReplaySubject<User>();

    constructor(private http: HttpClient) {}
    
    get me$(): ReplaySubject<User> {

        if (localStorage.me == null) {
            this.getMeFromServer().subscribe(
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

    private getMeFromServer() {
        return this.http.get(`${environment.apiUrl}/users/me`)
        .pipe(
            map((response: UsersResponse) => { 
                return { 
                    ...response.users[0],
                    birthDate: new Date(response.users[0].birthDate),
                    creationDate: new Date(response.users[0].creationDate),
                    lastVisited: new Date(response.users[0].lastVisited),
                    pathToAvatar: location.origin + "/" + response.users[0].pathToAvatar,
                    pathToCover: location.origin + "/" + response.users[0].pathToCover,
                }
            })
        );
    }
}