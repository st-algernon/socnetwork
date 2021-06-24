import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { Post, UserComment, UserPost } from '../interfaces';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' }) 
export class PostsHub {

    private hubConnection: signalR.HubConnection;
    public postLikes$ = new Subject<UserPost>();
    public commentLikes$ = new Subject<UserComment>();

    constructor (
        private auth: AuthService
    ) {}
    
    startConnection () {
        if (!this.hubConnection) {
            this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('/hubs/posts', { accessTokenFactory: () => this.auth.token })
            .build();

            this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err))
        }
    }

    addReceivedPostLikesListener() {
        this.hubConnection.on("ReceivePostLikes", (userPost: UserPost) => {
            this.postLikes$.next(userPost);
        });
    }

    addReceivedCommentLikesListener() {
        this.hubConnection.on("ReceiveCommentLikes", (userComment: UserComment) => {
            this.commentLikes$.next(userComment);
        });
    }

    likePost(postId: string) {
        this.hubConnection.invoke('LikePost', postId);
    }

    unlikePost(postId: string) {
        this.hubConnection.invoke('UnlikePost', postId);
    }

    likeComment(commentId: string) {
        this.hubConnection.invoke('LikeComment', commentId);
    }
    
    unlikeComment(commentId: string) {
        this.hubConnection.invoke('UnlikeComment', commentId);
    }
}