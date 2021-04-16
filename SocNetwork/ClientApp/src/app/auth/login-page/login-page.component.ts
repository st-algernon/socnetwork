import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountLoginRequest } from '../../shared/interfaces';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'login-auth-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = new FormGroup ({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.minLength(6), Validators.required])
    })
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

    this.auth.login(loginRequest).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/news']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }
}
