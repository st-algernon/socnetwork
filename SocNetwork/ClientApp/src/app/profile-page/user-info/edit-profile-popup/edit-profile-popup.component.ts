import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile-popup',
  templateUrl: './edit-profile-popup.component.html',
  styleUrls: ['./edit-profile-popup.component.css']
})
export class EditProfilePopupComponent implements OnInit {

  @Input()
  isOpened: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.isOpened = false;
  }
}
