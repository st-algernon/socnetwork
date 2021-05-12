import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Chat, ChatRequest, Message, MessageRequest } from '../interfaces';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' }) 
export class MessengerHub {
    private hubConnection: signalR.HubConnection

    constructor (
        private auth: AuthService
    ) {}
    startConnection () {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('/hubs/messenger', { accessTokenFactory: () => this.auth.token })
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }

    addReceivedMessageListener() {
        this.hubConnection.on("Receive", function (chat, message) {
            console.log('Chat', chat);
            console.log('Message', message);
        });
    }

    sendMessage(chat: ChatRequest, message: MessageRequest) {
        this.hubConnection.invoke('Send', chat, message);
    }
}