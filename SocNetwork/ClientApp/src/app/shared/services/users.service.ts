import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { EditProfileRequest, User, UsersResponse } from "../interfaces";
import { AuthService } from "./auth.service";

@Injectable() 
export class UsersService {

    constructor(
        private http: HttpClient,
        private authService: AuthService
        ) {}

    getAll() {
        return this.http.get(`${environment.apiUrl}/users`)
        .pipe(tap(console.log));
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
                }
             })
        );
    }

    editProfile(editProfileRequest: EditProfileRequest) {
        const token = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.token);

        return this.http.put(`${environment.apiUrl}/users`, editProfileRequest, { headers: token })
        .pipe(tap(console.log));
    }
}