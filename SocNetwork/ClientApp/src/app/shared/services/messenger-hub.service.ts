import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable() 
export class MessengerHubService {
    private hubConnection: signalR.HubConnection

    startConnection () {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('/messenger')
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }

    addReceivedMessageListener() {
        this.hubConnection.on("Receive", function (data) {
            console.log('Receive', data);
        });
    }

    sendMessage(message: string) {
        this.hubConnection.invoke("Send", message);
    }
}