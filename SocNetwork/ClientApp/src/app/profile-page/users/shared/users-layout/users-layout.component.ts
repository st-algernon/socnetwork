import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-layout',
  templateUrl: './users-layout.component.html',
  styleUrls: ['./users-layout.component.css']
})
export class UsersLayoutComponent implements OnInit {

  username: string;
  subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subs.push( 

      this.route.params.subscribe((params: Params) => {
        this.username = params['username'];
      })

    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => {
      s.unsubscribe();
    });
  }

}
