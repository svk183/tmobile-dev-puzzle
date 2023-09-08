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
  // This field is used to show/hide the component only when the toggle is ON/OFF
  @Input() isLoaded: boolean;
  pickDate = [];
  selectedDate: string;
  
  constructor(private readonly store: Store) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  showDatePicker(index: number) {
    this.pickDate.map((x, i) => {
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
    this.selectedDate = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoaded = changes.isLoaded.currentValue;
    // Closing/resetting all the date pickers open state
    if(this.isLoaded) {
      this.pickDate = this.pickDate.map(x=>false);
    }
  }

  getFormatedDate() {
    // We can use external formatters/packages to format the date, but since we dont have much use of whole package writting own format
    return `${new Date(this.selectedDate).getFullYear()}-${new Date(this.selectedDate).getMonth()+1}-${new Date(this.selectedDate).getDate()}T00:00:00.000Z`;
  }
}
