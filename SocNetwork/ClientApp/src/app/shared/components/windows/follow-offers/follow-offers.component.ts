import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShortProfile } from 'src/app/shared/interfaces';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-follow-offers',
  templateUrl: './follow-offers.component.html',
  styleUrls: ['./follow-offers.component.css']
})
export class FollowOffersComponent implements OnInit, OnDestroy {

  users: ShortProfile[];
  subs: Subscription[] = [];

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.subs.push(
      this.usersService.getFollowOffers().subscribe((profiles: ShortProfile[]) => {
        this.users = profiles;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => {
      s.unsubscribe();
    });
  }
}
