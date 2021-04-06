import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-edit-profile-popup',
  templateUrl: './edit-profile-popup.component.html',
  styleUrls: ['./edit-profile-popup.component.css']
})
export class EditProfilePopupComponent implements OnInit {

  form: FormGroup;

  @Input() user: User;

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

  selectedCar: number;

  cars = [
      { id: 1, name: 'Volvo' },
      { id: 2, name: 'Saab' },
      { id: 3, name: 'Opel' },
      { id: 4, name: 'Audi' },
  ];
  
  constructor() { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(this.user.name, [Validators.pattern(RegExp('^[A-Za-zА-Яа-я ]*$')), Validators.minLength(3), Validators.maxLength(35)]),
      username: new FormControl(this.user.username, [Validators.pattern('^[A-Za-z0-9_]*$'), Validators.minLength(3), Validators.maxLength(20)]),
      dayOfBirth: new FormControl(this.user.birthDate.getUTCDate(), [Validators.min(1), Validators.max(31)]),
      monthOfBirth: new FormControl(this.user.birthDate.getUTCMonth(), [Validators.min(1), Validators.max(12)]),
      yearOfBirth: new FormControl(this.user.birthDate.getUTCFullYear(), [Validators.min(1900), Validators.max(new Date().getFullYear())]),
      bio: new FormControl(this.user.bio, [Validators.maxLength(50)]),
      maritalStatus: new FormControl(this.user.maritalStatus),
      gender: new FormControl(this.user.gender)
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
