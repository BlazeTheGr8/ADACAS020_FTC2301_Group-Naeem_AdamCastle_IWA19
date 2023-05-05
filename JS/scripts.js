//@ts-nocheck

import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";
import { createPreviewsFragment, selectors, settingsEvents, themeUpdate, moreBooks, singleBookPreview } from "./functions.js";

export const matches = books
const range = [0, BOOKS_PER_PAGE];
export const fragment = document.createDocumentFragment();
let page = 1;

if (!books && !Array.isArray(books)) throw new Error('Source required') 
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

// Adds the first 36 books to webpage
selectors.dataListItems.appendChild(createPreviewsFragment(matches, 0, 36))

// This section of code adds all present book buttons to an array, then iterates through each of them to add an event listener for clicking, when clicked, the book preview will show to the user
selectors.singleBook = document.querySelectorAll(".preview");
for (let button of selectors.singleBook) {
button.addEventListener("click", singleBookPreview);
}
selectors.bookPreviewClose.addEventListener("click", singleBookPreview);

// This section of code adds a clicking event for the theme search button, when clicked it will show the dialog tag for them settings, when the close button is clicked in the dialog tag it will close
selectors.searchButton.addEventListener("click", (event) => {
    document.querySelector("[data-search-overlay]").showModal();
    document.querySelector("[data-search-title]").focus();
}); 
selectors.cancelSearch.addEventListener("click", (event) => {
  document.querySelector("[data-search-overlay]").close();
});

// This section of code adds a clicking event for the theme settings button, when clicked it will show the dialog tag for them settings, when the close button is clicked in the dialog tag it will close
selectors.settingsButton.addEventListener('click', settingsEvents)
selectors.settingsCancel.addEventListener('click', settingsEvents)

// This code adds text to the Show More button and also calculates remaining books to display
selectors.moreButton.innerHTML = /* html */
    `<span>Show more</span>
    <span class="list__remaining">${
      matches.length - [page * BOOKS_PER_PAGE] > 0
        ? matches.length - [page * BOOKS_PER_PAGE]
        : 0
}</span>`;

// This code adds a click event to the moreButton which will display the next 36 books when clicked
selectors.moreButton.addEventListener('click', moreBooks) 

// This sets the web theme to the same as the users device preferences
selectors.themeSettings.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';

// This code changes the them when the user saves their choice
selectors.saveSettings.addEventListener('submit', themeUpdate)

// This code creates the search options for genres
const genresList = document.createDocumentFragment()
let presetGenre = 'All Genres'
selectors.searchGenres.innerHTML = `<option>${presetGenre}</option>`
selectors.searchGenres.appendChild(genresList);
for (let [genreID, genreName] of Object.entries(genres)) {
    let genreOption = document.createElement("option");
    genreOption.innerText = `${genreName}`
    genreOption.value = genreID
    genresList.appendChild(genreOption)
}
selectors.searchGenres.appendChild(genresList);


// This code creates the search options for authors
const authorList = document.createDocumentFragment()
let presetAuthor = 'All Authors'
selectors.authorsOptions.innerHTML = `<option>${presetAuthor}</option>`;
for (let [id, name] of Object.entries(authors)) {
    let authorOption = document.createElement('option')
    authorOption.innerText = `${name}`
    authorOption.value = id
    authorList.appendChild(authorOption)
}
selectors.authorsOptions.appendChild(authorList)


// data-search-form.click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//             genreMatch = filters.genre = 'any'
//             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
//         }

//         if titleMatch && authorMatch && genreMatch => result.push(book)
//     }

//     if display.length < 1 
//     data-list-message.class.add('list__message_show')
//     else data-list-message.class.remove('list__message_show')



// data-list-items.click() {
//     pathArray = Array.from(event.path || event.composedPath())
//     active;

//     for (node; pathArray; i++) {
//         if active break;
//         const previewId = node?.dataset?.preview
    
//         for (const singleBook of books) {
//             if (singleBook.id === id) active = singleBook
//         } 
//     }
    