import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile-menu-popup',
  templateUrl: './profile-menu-popup.component.html',
  styleUrls: ['./profile-menu-popup.component.css']
})
export class ProfileMenuPopupComponent implements OnInit {

  @Input() me: Profile;
  
  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.reloadCurrentRoute();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}
