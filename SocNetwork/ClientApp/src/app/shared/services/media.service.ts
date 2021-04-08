import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class MediaService {

    constructor(private http: HttpClient) {}

    public uploadFile(formData: FormData) {
        return this.http.post(`${environment.apiUrl}/media`, formData, {reportProgress: true, observe: 'events'});
    }
}