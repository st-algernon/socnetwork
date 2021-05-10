import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {
  AccountLoginRequest,
  AccountRegistrationRequest,
  AuthResponse,
} from "../interfaces";

@Injectable({ providedIn: "root" })
export class AuthService {

  get token(): string | null {
    const expDate = new Date(localStorage.getItem("token-exp"));

    if (new Date() > expDate) {
      this.logout();
      return null;
    }

    return localStorage.getItem("token");
  }

  constructor(private http: HttpClient) {}

  login(loginRequest: AccountLoginRequest) {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login`, loginRequest)
      .pipe(
        tap(this.setToken),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  register(registrationRequest: AccountRegistrationRequest) {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/register`, registrationRequest)
      .pipe(
        tap(this.setToken),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  // private handleError(error: HttpErrorResponse) {
  //     const message = error.error.error.message

  //     switch(message) {
  //         case 'INVALID_EMAIL':
  //             this.error$.next('Invalid email')
  //         break
  //         case 'INVALID_PASSWORD':
  //             this.error$.next('Invalid password')
  //         break
  //         case 'EMAIL_NOT_FOUND':
  //             this.error$.next('Email not found')
  //         break
  //     }

  //     return throwError(error)
  // }

  private setToken(response: AuthResponse) {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 60 * 1000
      );
      localStorage.setItem("token", response.token);
      localStorage.setItem("token-exp", expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
