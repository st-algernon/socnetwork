import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User, UsersResponse } from "../interfaces";

@Injectable({ providedIn: 'root' }) 
export class MeStorage {

    sub: Subscription;

    private _me$ = new Subject<User>();

    constructor(private http: HttpClient) {}

    get me$(): Subject<User> {
        if (localStorage.me == null) {
            this.getMeFromServer().subscribe(
                (response: User) => {
                    localStorage.me = JSON.stringify(response);
                },
                (error) => {
                    console.log()
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
        console.log('start get me from server');

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