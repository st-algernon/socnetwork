import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Chat, ShortChatsResponse, Message, Profile, ChatResponse, ShortChat } from "../interfaces";
import { UsersService } from "./users.service";

@Injectable()
export class ChatsService {
  constructor(
    private http: HttpClient, 
    private usersService: UsersService
  ) {}
  
  getChatById(chatId: string): Observable<Chat> {
    return this.http.get<ChatResponse>(`${environment.apiUrl}/chats/${chatId}`)
    .pipe(
      map((response: ChatResponse) => response.chat)
    )
  }

  getShortChatWith(userId: string): Observable<ShortChat> {
    return this.http.get<ShortChatsResponse>(`${environment.apiUrl}/chats/with/${userId}`)
    .pipe(
      map((response: ShortChatsResponse) => response.shortChats[0])
    );
  }

  getShortChats(): Observable<ShortChat[]> {
    return this.http.get<ShortChatsResponse>(`${environment.apiUrl}/chats`)
    .pipe(
      map((response: ShortChatsResponse) => response.shortChats)
    );
  }
}
