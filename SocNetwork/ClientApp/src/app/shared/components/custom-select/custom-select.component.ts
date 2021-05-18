import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Options } from '../../interfaces';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css']
})
export class CustomSelectComponent implements OnInit {

  @Input()
  selected: Options;

  @Input()
  options: Options[];

  @Input()
  label: string;

  @Output()
  changeEvent = new EventEmitter<Options>();

  constructor() { }

  ngOnInit() {
    if (this.selected == null) {
      this.selected = this.options[0];
    }

    this.changeEvent.emit(this.selected);
  }

  toggleFor(element: HTMLElement) {
    element.classList.toggle('collapse');
  }

  choose(event: MouseEvent) {
    if(event.currentTarget == event.target) {
      return
    }

    this.selected = this.options.find(o => o.key == (event.target as HTMLElement).dataset.key);
    this.changeEvent.emit(this.selected);
  }
}