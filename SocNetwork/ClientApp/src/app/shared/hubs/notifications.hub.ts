import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { Notification, PostNotif, PostNotifRequest, UserNotifRequest } from '../interfaces';
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
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('/hubs/notifications', { accessTokenFactory: () => this.auth.token })
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }

    addReceivedPostNotifsListener() {
        this.hubConnection.on("ReceivePostNotif", (notif: PostNotif) => {
            console.log('Post notif', notif);
            this.notif$.next(notif);
        });
    }

    addReceivedUserNotifsListener() {
        this.hubConnection.on("ReceiveUserNotif", (notif: Notification) => {
            console.log('User notif', notif);
            this.notif$.next(notif);
        });
    }

    postNotify(request: PostNotifRequest) {
        this.hubConnection.invoke('PostNotify', request);
    }

    userNotify(request: UserNotifRequest) {
        this.hubConnection.invoke('UserNotify', request);
    }
}