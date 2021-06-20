import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {
  AccountLoginRequest,
  AccountRegistrationRequest,
  AuthResponse,
  TokenRequest,
  VerificationResponse,
} from "../interfaces";

@Injectable({ providedIn: "root" })
export class AuthService {

  get token(): string {
    const expDate = new Date(localStorage.getItem("token-exp"));

    if (new Date() > expDate) {
      this.logout();
      return null;
    }

    return localStorage.getItem('token');
  }

  get refreshToken(): string {
    return localStorage.getItem('refresh-token');
  }

  constructor(private http: HttpClient) {}

  login(loginRequest: AccountLoginRequest) {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login`, loginRequest)
      .pipe(
        tap(this.setTokens),
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
        tap(this.setTokens),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  updateToken() {
    const request: TokenRequest = {
      token: this.token,
      refreshToken: this.refreshToken
    }

    return this.http.put<AuthResponse>(`${environment.apiUrl}/auth/refresh`, request)
      .pipe(
        tap(this.setTokens),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  verificationEmail(email: string): Observable<boolean> {
    return this.http.get<VerificationResponse>(`${environment.apiUrl}/auth/verification/email/${email}`)
    .pipe(
        map((response: VerificationResponse) => response.result)
    );
}

  verificationUsername(username: string): Observable<boolean> {
      return this.http.get<VerificationResponse>(`${environment.apiUrl}/auth/verification/username/${username}`)
      .pipe(
          map((response: VerificationResponse) => response.result)
      );
  }

  logout() {
    this.setTokens(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setTokens(response: AuthResponse) {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 60 * 1000
      );
      localStorage.setItem("token", response.token);
      localStorage.setItem("refresh-token", response.refreshToken);
      localStorage.setItem("token-exp", expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
