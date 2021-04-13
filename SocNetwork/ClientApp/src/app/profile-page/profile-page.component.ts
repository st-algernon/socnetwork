import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User, UsersResponse } from '../shared/interfaces';
import { MediaService } from '../shared/services/media.service';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: User;
  me: User;  

  editProfileFlag: boolean = false;
  uSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
    ) { }

  ngOnInit(): void {

    this.me = this.usersService.getMeFromStorage();
    
    // this.uSub = this.route.params.pipe (
    //   switchMap((params: Params) => {
    //     return this.usersService.getUser(params['username'])
    //   })
    // ).subscribe((response: UsersResponse) => {
    //   this.post = post;
    //   this.form = new FormGroup({
    //     title: new FormControl(post.title, Validators.required),
    //     author: new FormControl(post.author, Validators.required)
    //   })
    // })

    this.route.params.pipe (
      switchMap((params: Params) => {
        return this.usersService.getByUsername(params['username']);
      })
    ).subscribe((response: User) => {
      this.user = response;
      console.log(this.user);
    });
  }
}
