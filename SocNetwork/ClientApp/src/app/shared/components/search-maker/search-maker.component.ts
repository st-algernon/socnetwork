import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShortProfile, Tag } from '../../interfaces';
import { TagsService } from '../../services/tags.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-search-maker',
  templateUrl: './search-maker.component.html',
  styleUrls: ['./search-maker.component.css']
})
export class SearchMakerComponent implements OnInit, OnDestroy {

  @Input() seed: string;
  query: string;
  wantedUsers: ShortProfile[] = [];
  wantedTags: Tag[] = [];
  containerVisible: boolean = false;
  subs: Subscription[] = [];

  constructor(
    private usersService: UsersService,
    private tagsService: TagsService
  ) { }

  ngOnInit(): void {
    this.query = this.seed;

    document.onclick = ($event) => {
      const searchMaker = ($event.target as HTMLElement).closest('.search-maker');
      
      if (searchMaker) {
        this.containerVisible = true;
      } else {
        this.containerVisible = false;
      }
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => {
      s.unsubscribe();
    });
  }

  onInput() {
    if (this.query) {

      if (this.query.startsWith('#')) {
        const content = this.query.slice(1);

        if (content.length != 0) {
          this.subs.push (

            this.tagsService.getWantedTags(this.query.slice(1)).subscribe((tags: Tag[]) => {
              console.log(tags)
              this.wantedTags = tags;
            })
  
          );
        }
      } else {
        this.subs.push(

          this.usersService.getWantedhUsers(this.query).subscribe((users: ShortProfile[]) => {
              this.wantedUsers = users;
              console.log(this.wantedUsers);
            }
          )
    
        );
      }
    } else {
      this.wantedUsers = [];
      this.wantedTags = [];
    }
  }

  onSubmit(form: NgForm) {

  }
}
