import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountLoginRequest } from '../../shared/interfaces';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'login-auth-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false;
  subs: Subscription[] = [];

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = new FormGroup ({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.minLength(6), Validators.required])
    })
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true;

    const loginRequest: AccountLoginRequest = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.subs.push(
      this.authService.login(loginRequest).subscribe(() => {
        this.form.reset();
        this.router.navigate(['/news']);
        this.submitted = false;
      }, () => {
        this.submitted = false;
      })
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);

    this.subs.push(

      this.authService.solveRecaptcha(captchaResponse).subscribe((isPassed: boolean) => {
        console.log(isPassed);
      })
      
    )
  }
}
