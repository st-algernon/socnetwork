import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-profile-menu-popup',
  templateUrl: './profile-menu-popup.component.html',
  styleUrls: ['./profile-menu-popup.component.css']
})
export class ProfileMenuPopupComponent implements OnInit {

  @Input() me: User;
  
  constructor() { }

  ngOnInit() {
  }

}
