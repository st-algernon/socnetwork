import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Profile } from '../shared/interfaces';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit, OnDestroy {
  me: Profile;
  subs: Subscription[] = [];

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.subs.push(
      this.usersService.me$.subscribe((response: Profile) => this.me = response),
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => {
      s.unsubscribe();
    });
  }
}
