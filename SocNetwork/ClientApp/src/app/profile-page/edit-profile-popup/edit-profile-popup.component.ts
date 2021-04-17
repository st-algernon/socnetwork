import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditProfileRequest, Options, SelectConfig, User } from 'src/app/shared/interfaces';
import { GenderOptions, MaritalStatusOptions } from 'src/app/shared/enums-options';
import { UsersService } from 'src/app/shared/services/users.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MediaService } from 'src/app/shared/services/media.service';
import { Gender, MediaFor } from 'src/app/shared/enums';
import { Router, RouterModule } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profile-popup',
  templateUrl: './edit-profile-popup.component.html',
  styleUrls: ['./edit-profile-popup.component.css']
})
export class EditProfilePopupComponent implements OnInit, OnDestroy {

  form: FormGroup;

  @Input() user: User;

  @Output() onClose = new EventEmitter<boolean>();

  genderSelect: SelectConfig;

  maritalStatusSelect: SelectConfig;

  selectedGender: Options;

  selectedMaritalStatus: Options;

  coverFile: File;

  avatarFile: File;

  editAvatarSub: Subscription;

  editCoverSub: Subscription;

  editInfoSub: Subscription;

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

  constructor(
    private usersService: UsersService,
    private mediaService: MediaService,
    private router: Router,
    ) { }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(this.user.profileInfo.name, [Validators.pattern(RegExp('^[A-Za-zА-Яа-я ]*$')), Validators.minLength(3), Validators.maxLength(35)]),
      username: new FormControl(this.user.profileInfo.username, [Validators.pattern('^[A-Za-z0-9_]*$'), Validators.minLength(3), Validators.maxLength(20)]),
      dayOfBirth: new FormControl(null, [Validators.min(1), Validators.max(31)]),
      monthOfBirth: new FormControl(null, [Validators.min(1), Validators.max(12)]),
      yearOfBirth: new FormControl(null, [Validators.min(1900), Validators.max(new Date().getFullYear())]),
      bio: new FormControl(this.user.profileInfo.bio, [Validators.maxLength(50)]),
    });

    if (this.user.profileInfo.birthDate.getUTCFullYear() > 1900) 
    {
      this.dayOfBirth.setValue(this.user.profileInfo.birthDate.getUTCDate());
      this.monthOfBirth.setValue(this.user.profileInfo.birthDate.getUTCMonth());
      this.yearOfBirth.setValue(this.user.profileInfo.birthDate.getUTCFullYear())
    }

    this.genderSelect = { 
      label: 'gender',
      options: GenderOptions,
      selected: GenderOptions.find(o => o.key == this.user.profileInfo.gender.toString())
    };

    this.maritalStatusSelect = {
      label: 'marital status',
      options: MaritalStatusOptions,
      selected: MaritalStatusOptions.find(o => o.key == this.user.profileInfo.maritalStatus.toString())
    }
  }

  close() {
    this.onClose.emit(false);
  }

  submit() {
    if(this.form.invalid) {
      return
    }

    const birthDate = new Date(
      this.form.value.yearOfBirth, 
      this.form.value.monthOfBirth,
      this.form.value.dayOfBirth
    );

    const request: EditProfileRequest = {
      id: this.user.profileInfo.id,
      email: this.user.profileInfo.email,
      name: this.form.value.name,
      username: this.form.value.username,
      bio: this.form.value.bio,
      birthDate: birthDate.toJSON(),
      location: this.user.profileInfo.location,
      gender: this.selectedGender.key,
      maritalStatus: this.selectedMaritalStatus.key
    }

    forkJoin({
      cover: this.uploadImage(this.coverFile, MediaFor.Cover),
      avatar: this.uploadImage(this.avatarFile, MediaFor.Avatar),
      info: this.usersService.editProfile(request)
    }).subscribe(() => {
      this.reloadCurrentRoute();
    });
  }

  previewImage(file: File, previewImageBox: HTMLImageElement) {

    if (file.type.match('image*')) {
      
      const reader = new FileReader();
      
      reader.onload = function(e: ProgressEvent) {     
        previewImageBox.src = (e.target as FileReader).result.toString();
      };
   
      reader.readAsDataURL(file);
    }
  }

  uploadImage(file: File, mediaFor: MediaFor) {

    if (file == null) {
      return null;
    }

    const formData = new FormData();

    formData.set('file', file, file.name);

    return this.mediaService.uploadProfileMedia(formData, mediaFor);
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
