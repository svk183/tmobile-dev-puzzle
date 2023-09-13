import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, updateReadingList } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnChanges {
  readingList$ = this.store.select(getReadingList);
  // This field is used to show/hide the component when the toggle is ON/OFF
  @Input() isLoaded: boolean;
  // This field is used to show respective date picker on click of Mark as read
  pickDate = [];
  // This field is used to read/write the date in datepicket text input
  selectedDate: string;
  // This field is used to restrict the date picker to hide future dates
  today = new Date();
  
  constructor(private readonly store: Store) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  showDatePicker(index: number) {
    this.pickDate.map((_x, i) => {
      if( i === index ) {
        this.pickDate[i] = !this.pickDate[i];
      } else {
        this.pickDate[i] = false;
      }
    })
  }

  markBookAsFinished(item, index) {
    this.pickDate[index] = false;
    this.store.dispatch(updateReadingList({ item: {bookId: item.id, finished: true, finishedDate: this.getFormatedDate(), ...item} }));
    // Clearing the input field
    this.selectedDate = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoaded = changes?.isLoaded?.currentValue;
    // Closing/resetting all the date pickers to close state
    if(this.isLoaded) {
      this.pickDate = this.pickDate.map(_x=>false);
    }
  }

  getFormatedDate() {
    // We can use external formatters/packages to format the date, but since we dont have much use of whole package writting own format
    const date = new Date(this.selectedDate);
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}T00:00:00.000Z`;
  }
}
