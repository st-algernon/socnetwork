import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable() 
export class MessengerService {
    constructor(
        private http: HttpClient
    ) {}

    getChatWith(userId: string) {
        return this.http.get(`${environment.apiUrl}/messenger/chat/${userId}`);
    }
}