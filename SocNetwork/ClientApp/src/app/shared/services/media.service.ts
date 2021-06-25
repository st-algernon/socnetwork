import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { MediaFor } from "../enums";
import { Media, MediaResponse } from "../interfaces";

@Injectable({ providedIn: "root" })
export class MediaService {
  constructor(
    private http: HttpClient,
    ) {}

  uploadProfileMedia(formData: FormData, mediaFor: MediaFor) {
    const header = new HttpHeaders({
      'Media-For': mediaFor.toString()
    });

    return this.http.post(`${environment.apiUrl}/media/profile`, formData, { headers: header })
    .pipe(
      tap(console.log)
    );
  }

  uploadMedia(formData: FormData): Observable<Media[]> {
    return this.http.post<MediaResponse>(`${environment.apiUrl}/media`, formData)
    .pipe(
      map((response: MediaResponse) => response.media)
    );
  }

  getUserMedia(username: string): Observable<Media[]> {
    return this.http.get<MediaResponse>(`${environment.apiUrl}/media/${username}`)
    .pipe(
      map((response: MediaResponse) => response.media)
    )
  }
}
