import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ShortProfile } from 'src/app/shared/interfaces';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-users-layout',
  templateUrl: './users-layout.component.html',
  styleUrls: ['./users-layout.component.css']
})
export class UsersLayoutComponent implements OnInit {

  user: ShortProfile;
  subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.subs.push( 

      this.route.params.pipe(
        switchMap((params: Params) => {
          console.log(params['username']);
          return this.usersService.getShortProfile(params['username']);
        })
      ).subscribe((shortProfile: ShortProfile) => {
        console.log(shortProfile);
        this.user = shortProfile;
      })

    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => {
      s.unsubscribe();
    });
  }

}
