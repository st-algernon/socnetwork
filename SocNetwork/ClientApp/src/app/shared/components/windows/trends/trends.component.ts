import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tag } from 'src/app/shared/interfaces';
import { TagsService } from 'src/app/shared/services/tags.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit, OnDestroy {

  tags: Tag[];
  subs: Subscription[] = [];

  constructor(private tagsService: TagsService) { }

  ngOnInit(): void {
    this.subs.push(

      this.tagsService.getTrends().subscribe((tags: Tag[]) => {
        this.tags = tags;
      })

    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => {
      s.unsubscribe();
    })
  }
}
