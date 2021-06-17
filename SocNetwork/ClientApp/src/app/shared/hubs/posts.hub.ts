import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { Post, UserPost } from '../interfaces';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' }) 
export class PostsHub {

    private hubConnection: signalR.HubConnection;
    public posts$ = new Subject<UserPost>();

    constructor (
        private auth: AuthService
    ) {}
    
    startConnection () {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('/hubs/posts', { accessTokenFactory: () => this.auth.token })
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }

    addReceivedPostLikesListener() {
        this.hubConnection.on("ReceivePostLikes", (userPost: UserPost) => {
            console.log('Post liked', userPost);
            this.posts$.next(userPost);
        });
    }

    likePost(postId: string) {
        this.hubConnection.invoke('LikePost', postId);
    }
}