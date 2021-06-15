import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountRegistrationRequest } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;;

  get email() {
    return this.form.get('email');
  }

  get name() {
    return this.form.get('name');
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.form = new FormGroup ({
      email: new FormControl(null, [Validators.email, Validators.required]),
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(/(?:[^\x00-\x7F]|\w)+/g), 
        Validators.minLength(3),
        Validators.maxLength(35)]
      ),
      username: new FormControl(null, [Validators.pattern('^[A-Za-z0-9_]{3,15}$'), Validators.required]),
      password: new FormControl(null, [Validators.minLength(6), Validators.required])
    });
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true;

    const registrationRequest: AccountRegistrationRequest = {
      email: this.form.value.email,
      name: this.form.value.name,
      username: this.form.value.username,
      password: this.form.value.password
    };

    this.auth.register(registrationRequest).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/news']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }
}
