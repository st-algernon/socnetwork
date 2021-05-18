import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { Chat, Message } from '../interfaces';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' }) 
export class MessengerHub {

    private hubConnection: signalR.HubConnection;
    public message$ = new Subject<Message>();
    public me: string;

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
        this.hubConnection.on("Receive", (message: Message) => {
            console.log('Message', message);
            this.message$.next(message);
        });
    }

    sendMessage(message: Message) {
        this.hubConnection.invoke('Send', message);
    }
}