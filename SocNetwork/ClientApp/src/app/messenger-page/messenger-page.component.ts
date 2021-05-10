import { Component, OnInit } from '@angular/core';
import { MessengerHubService } from '../shared/services/messenger-hub.service';

@Component({
  selector: 'app-messenger-page',
  templateUrl: './messenger-page.component.html',
  styleUrls: ['./messenger-page.component.css']
})
export class MessengerPageComponent implements OnInit {

  constructor(private messengerHubService: MessengerHubService) { }

  ngOnInit() {
    this.messengerHubService.startConnection();
    this.messengerHubService.addReceivedMessageListener();
  }

}
