import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { MediaFor } from "../enums";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class MediaService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) {}

  public uploadProfileMedia(formData: FormData, mediaFor: MediaFor) {
    const header = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.token,
      'Media-For': mediaFor.toString()
    });

    return this.http
      .post(`${environment.apiUrl}/media/profile`, formData, { headers: header })
      .pipe(tap(console.log));
  }
}
