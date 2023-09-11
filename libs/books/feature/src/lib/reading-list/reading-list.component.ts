import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { failedRemoveFromReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnChanges {
  readingList$ = this.store.select(getReadingList);
  // This field is used to show/hide the component when the toggle is ON/OFF
  @Input() isLoaded: boolean;

  constructor(private readonly store: Store,
              private snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));

    this.snackBarFunctionality(item);
  }

  snackBarFunctionality(item) {
    // code to open the Snackbar
    const snackBarRef = this.snackBar.open('Removed Book from Read List', 'UNDO', {
      duration: 2000
    });

    // Action triggers when user clicks on Undo button of snackbar, where we are adding back the book to readlist
    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(failedRemoveFromReadingList({ item }));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoaded = changes?.isLoaded?.currentValue; 
  }
}
