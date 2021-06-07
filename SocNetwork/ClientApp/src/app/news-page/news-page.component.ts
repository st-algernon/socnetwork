import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShortProfile } from '../shared/interfaces';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit, OnDestroy {
  me: ShortProfile;
  subs: Subscription[] = [];

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.subs.push(
      this.usersService.me$.subscribe((shortProfile: ShortProfile) => this.me = shortProfile),
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => {
      s.unsubscribe();
    });
  }
}
