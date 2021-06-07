import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Chat, ShortChatsResponse, Message, Profile, ChatResponse, ShortChat } from "../interfaces";
import { UsersService } from "./users.service";

@Injectable()
export class MessengerService {
  constructor(
    private http: HttpClient, 
    private usersService: UsersService
  ) {}

  getChatWith(userId: string): Observable<Chat> {
    return this.http.get<ChatResponse>(`${environment.apiUrl}/chats/with/${userId}`)
    .pipe(
      map((response: ChatResponse) => response.chat)
    );
  }

  getChats(): Observable<ShortChat[]> {
    return this.http.get<ShortChatsResponse>(`${environment.apiUrl}/chats`)
    .pipe(
      map((response: ShortChatsResponse) => response.shortChats)
    );
  }
}
