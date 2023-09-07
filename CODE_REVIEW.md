Code Changes:

1. It is a good practice to unsubscribe all the subscribers present in the component(before leaving the component). So in BookSearchComponent, we need to extend Angular's onDestroy life cycle hook and unsubscribe all the existing subscribers.
2. Search is happening even there is no change in query term - we can disable the search button until there is a change in query term.
3. on page load, loading readingListComponent where we have Images of all the reading list books. Which is unnecessary - can be loaded on toogle ON(when user wants to view cart/Reading list).
4. On change of reading list state value(remove existing book from "My Reading List"), books search state is triggering(irrespective of the current search term). Which internally refreshes the page.
5. Once user searches for a particular book and on clearing the search term existing books list is clearing Off(which is not a big issue), but once user enters a key in search bar it is showing previously searched books list - which confuses the user.
6. Error handling of books search API is missing, better to show some notification on getting error from books serach API.

Accessibility Issues:

Shown by Lighthouse

1. aria-lable for buttons
2. color contrast between background and the text in UI

Figured out

1. Alternate text for a image
2. Alternate text for a button
3. 