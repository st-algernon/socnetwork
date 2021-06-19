import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Notification, NotifsResponse } from "../interfaces";


@Injectable()
export class NotificationsService {
  constructor(
    private http: HttpClient
  ) {}
  
  getCurrentUserNotifs(): Observable<Notification[]> {
    return this.http.get<NotifsResponse>(`${environment.apiUrl}/notifications`)
    .pipe(
        map((response: NotifsResponse) => response.notificDTOs )
    )
  }
}
