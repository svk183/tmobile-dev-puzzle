import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  removeFromReadingList,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];
  subscriptions: Subscription[] = [];
  previousTerm = '';

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    // storing the store subsciber in the subscriptions array - which can be used as reference during unSubscribe.
    this.subscriptions.push(this.store.select(getAllBooks).subscribe(books => {
      // Comparing old object and the new object - to avoid unnecessary page/HTML load
      if(JSON.stringify(this.books) !== JSON.stringify(books)) {
        this.books = books;
      }
    }));
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    
    this.snackBarFunctionality(book);
  }

  snackBarFunctionality(book: Book) {
    // code to open the Snackbar
    const snackBarRef = this.snackBar.open('Added Book to Read List', 'UNDO', {
      duration: 2000
    });    
    
    // Action triggers when user clicks on Undo button of snackbar, where we are removing the book from readlist
    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(removeFromReadingList({ item: {bookId: book.id, ...book} }));
    });
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    this.previousTerm = this.searchForm.value.term;

    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy(): void {
      this.subscriptions?.forEach(sub=>sub.unsubscribe());
  }
}
