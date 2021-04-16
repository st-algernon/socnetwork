import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { MediaFor } from "../enums";
import { MediaResponse } from "../interfaces";

@Injectable({ providedIn: "root" })
export class MediaService {
  constructor(
    private http: HttpClient,
    ) {}

  uploadProfileMedia(formData: FormData, mediaFor: MediaFor) {
    const header = new HttpHeaders({
      'Media-For': mediaFor.toString()
    });

    return this.http
      .post(`${environment.apiUrl}/media/profile`, formData, { headers: header })
      .pipe(tap(console.log));
  }

  getProfileMedia(username: string) {
    return this.http.get<MediaResponse>(`${environment.apiUrl}/media/profile/${username}`)
      .pipe(
        tap(console.log)
      )
  }
}
