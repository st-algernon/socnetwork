import { Component, OnInit } from '@angular/core';
import { MessengerHub } from '../shared/hubs/messenger.hub';

@Component({
  selector: 'app-messenger-page',
  templateUrl: './messenger-page.component.html',
  styleUrls: ['./messenger-page.component.css']
})
export class MessengerPageComponent implements OnInit {

  constructor(private messengerHub: MessengerHub) { }

  ngOnInit() {
    this.messengerHub.startConnection();
    this.messengerHub.addReceivedMessageListener();
  }

}
