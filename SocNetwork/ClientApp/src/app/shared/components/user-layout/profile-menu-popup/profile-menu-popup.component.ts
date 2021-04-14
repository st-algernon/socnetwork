import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile-menu-popup',
  templateUrl: './profile-menu-popup.component.html',
  styleUrls: ['./profile-menu-popup.component.css']
})
export class ProfileMenuPopupComponent implements OnInit {

  @Input() me: User;
  
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

}
