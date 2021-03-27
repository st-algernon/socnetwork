import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-popup',
  templateUrl: './edit-profile-popup.component.html',
  styleUrls: ['./edit-profile-popup.component.css']
})
export class EditProfilePopupComponent implements OnInit {

  form: FormGroup;

  @Output() onClose = new EventEmitter<boolean>();

  get name() {
    return this.form.get('name');
  }

  get username() {
    return this.form.get('username');
  }

  get dayOfBirth() {
    return this.form.get('dayOfBirth');
  }

  get monthOfBirth() {
    return this.form.get('monthOfBirth');
  }

  get yearOfBirth() {
    return this.form.get('yearOfBirth');
  }

  get bio() {
    return this.form.get('bio');
  }

  get maritalStatus() {
    return this.form.get('maritalStatus');
  }

  get gender() {
    return this.form.get('gender');
  }

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.pattern(RegExp('^[A-Za-zА-Яа-я ]*$')), Validators.minLength(3), Validators.maxLength(35)]),
      username: new FormControl(null, [Validators.pattern('^[A-Za-z0-9_]*$'), Validators.minLength(3), Validators.maxLength(20)]),
      dayOfBirth: new FormControl(null, [Validators.min(1), Validators.max(31)]),
      monthOfBirth: new FormControl(null, [Validators.min(1), Validators.max(12)]),
      yearOfBirth: new FormControl(null, [Validators.min(1900), Validators.max(new Date().getFullYear())]),
      bio: new FormControl(null, [Validators.maxLength(50)]),
      maritalStatus: new FormControl(null),
      gender: new FormControl(null),
    });
  }

  close() {
    this.onClose.emit(false);
  }

  toggleFor(element: HTMLElement) {
    element.classList.toggle('collapse');
  }

  chooseFor(event: MouseEvent, input: HTMLInputElement) {
    if(event.currentTarget == event.target) {
      return
    }
    
    input.value = (event.target as HTMLElement).innerText;
  }

  submit() {
    if(this.form.invalid) {
      return
    }


  }
}
