import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShortProfile } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-account-menu-popup',
  templateUrl: './account-menu-popup.component.html',
  styleUrls: ['./account-menu-popup.component.css']
})
export class AccountMenuPopupComponent implements OnInit {

  @Input() me: ShortProfile;
  
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
