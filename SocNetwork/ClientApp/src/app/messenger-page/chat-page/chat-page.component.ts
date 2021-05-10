import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessengerHubService } from 'src/app/shared/services/messenger-hub.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  form: FormGroup;

  // get messageText() {
  //   return this.form.get('messageText');
  // }

  constructor(private messengerHubService: MessengerHubService) { }

  ngOnInit() {
    this.messengerHubService.startConnection();
    this.messengerHubService.addReceivedMessageListener();

    this.form = new FormGroup({
      messageText: new FormControl(null)
    })
  }

  submit() {
    this.messengerHubService.sendMessage(this.form.value.messageText);
  }
}
