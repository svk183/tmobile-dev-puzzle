import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnChanges {
  readingList$ = this.store.select(getReadingList);
  // This field is used to show/hide the component only when the toggle is ON/OFF
  @Input() isLoaded: boolean;

  constructor(private readonly store: Store) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoaded = changes.isLoaded.currentValue; 
  }
}
