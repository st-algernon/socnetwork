import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Notification, NotificationsResponse } from "../interfaces";


@Injectable()
export class NotificationsService {
  constructor(
    private http: HttpClient
  ) {}
  
  getCurrentUserNotifs(): Observable<NotificationsResponse> {
    return this.http.get<NotificationsResponse>(`${environment.apiUrl}/notifications`)
    // .pipe(
    //     map((response: NotificationsResponse) => response.posts )
    // )
  }
}
