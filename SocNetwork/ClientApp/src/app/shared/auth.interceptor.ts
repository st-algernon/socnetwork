import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { TokenRequest } from "./interfaces";
import { AuthService } from "./services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(
        private auth: AuthService,
        private router: Router
    ) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isAuthenticated()) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.token}`
                  }
            });
        }

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log('Interceptor Error: ', error)

                if (error.status === 401) {
                    this.auth.updateToken()
                }
                
                return throwError(error)
            })
        )
    }
}