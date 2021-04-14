import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User, UsersResponse } from '../shared/interfaces';
import { MeStorage } from '../shared/services/me-storage.service';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: User;
  me: any;  

  editProfileFlag: boolean = false;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private meStorage: MeStorage,
    private changeDetector: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.sub = this.route.params.pipe (
      switchMap((params: Params) => {
        return this.usersService.getByUsername(params['username']);
      })
    ).subscribe((response: User) => {
      this.user = response;
      console.log(this.user);
    });

    this.meStorage.me$.subscribe((response: User) => { this.me = response });
    console.log(this.me);
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
