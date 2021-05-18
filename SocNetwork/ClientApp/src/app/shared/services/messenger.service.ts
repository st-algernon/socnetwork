import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Chat, ChatsResponse, Message, Profile } from "../interfaces";
import { UsersService } from "./users.service";

@Injectable()
export class MessengerService {
  constructor(private http: HttpClient, private usersService: UsersService) {}

  getChatWith(userId: string): Observable<Chat> {
    return this.http.get<ChatsResponse>(`${environment.apiUrl}/messenger/chat/${userId}`)
      .pipe(
        map((response: ChatsResponse) => response.chats[0]),
        tap((chat: Chat) => {
          chat.membersDTO = chat.membersDTO.map((m) => this.usersService.completeProfile(m));
        }),
        tap((chat: Chat) => {
          chat.messagesDTO = chat.messagesDTO.map((m) => this.includeAuthor(chat, m));
        })
      );
  }

  getChats(): Observable<Chat[]> {
    return this.http.get<ChatsResponse>(`${environment.apiUrl}/messenger`).pipe(
      map((response: ChatsResponse) => response.chats),
      tap((response: Chat[]) => {
        response.forEach(
          (c) => (c.membersDTO = c.membersDTO.map(
            (m) => this.usersService.completeProfile(m)
          ))
        );
      }),
      tap((response: Chat[]) => {
        response.forEach(
          (c) => (c.messagesDTO = c.messagesDTO.map((m) => this.includeAuthor(c, m)))
        );
      })
    );
  }

  includeWithUser(chat: Chat, currentUser: Profile): Chat {
    return {
      ...chat,
      withUser: chat.membersDTO.find((m) => m.id != currentUser.id),
    };
  }

  includeAuthor(chat: Chat, message: Message): Message {
    return {
      ...message,
      author: chat.membersDTO.find((m) => m.id == message.authorId),
    };
  }
}
