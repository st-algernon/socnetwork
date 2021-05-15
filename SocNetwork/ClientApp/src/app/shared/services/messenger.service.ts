import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Chat, ChatResponse } from '../interfaces';

@Injectable() 
export class MessengerService {
    constructor(
        private http: HttpClient
    ) {}

    getChatWith(userId: string): Observable<Chat> {
        return this.http.get<ChatResponse>(`${environment.apiUrl}/messenger/chat/${userId}`)
        .pipe(
            map((response: ChatResponse) => { 
                console.log(response);
                return response.chat;
            })
        );
    }

    getChatById(chatId: string) {
        return this.http.get(`${environment.apiUrl}/messenger/chat/${chatId}`);
    }
}