import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { Notification, NotificRequest } from '../interfaces';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' }) 
export class NotificationsHub {

    private hubConnection: signalR.HubConnection;
    public notif$ = new Subject<Notification>();
    public me: string;

    constructor (
        private auth: AuthService
    ) {}
    
    startConnection () {
        if (!this.hubConnection) {
            this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('/hubs/notifications', { accessTokenFactory: () => this.auth.token })
            .build();
            this.hubConnection.serverTimeoutInMilliseconds = 1000 * 60 * 60;
            this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err))
        }
    }

    addReceivedNotificListener() {
        this.hubConnection.on("ReceiveNotific", (notif: Notification) => {
            this.notif$.next(notif);
        });
    }

    notify(request: NotificRequest) {
        this.hubConnection.invoke('Notify', request);
    }
}