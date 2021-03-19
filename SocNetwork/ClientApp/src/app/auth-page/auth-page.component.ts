import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  isSignIn: boolean;
  isSignUp: boolean;

  constructor() { }

  ngOnInit() {
    this.chooseSignIn();
  }

  chooseSignIn() {
    this.isSignIn = true;
    this.isSignUp = false;
  }

  chooseSignUp() {
    this.isSignIn = false;
    this.isSignUp = true;
  }

}
