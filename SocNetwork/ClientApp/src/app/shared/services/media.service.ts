import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { MediaFor } from "../enums";
import { UserMediaResponse } from "../interfaces";

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
    return this.http.get<UserMediaResponse>(`${environment.apiUrl}/media/profile/${username}`)
    .pipe(
      map((response: UserMediaResponse) => { return response.userMedia })
    )
  }
}
