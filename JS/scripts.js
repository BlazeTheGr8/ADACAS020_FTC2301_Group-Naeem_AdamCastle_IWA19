//@ts-nocheck

import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";
import { createPreviewsFragment, buttons, settingsEvents, themeUpdate, moreBooks, singleBookPreview } from "./functions.js";

export const matches = books
const range = [0, BOOKS_PER_PAGE];
export const fragment = document.createDocumentFragment();
let page = 1;

if (!books && !Array.isArray(books)) throw new Error('Source required') 
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

buttons.dataListItems.appendChild(createPreviewsFragment(matches, 0, 36))

buttons.singleBook = document.querySelectorAll(".preview");
for (let button of buttons.singleBook) {
button.addEventListener("click", singleBookPreview);
}
buttons.bookPreviewClose.addEventListener("click", singleBookPreview);


buttons.searchButton.addEventListener("click", (event) => {
    document.querySelector("[data-search-overlay]").showModal();
    document.querySelector("[data-search-title]").focus();
//   data - search - title.focus();
}); 

buttons.cancelSearch.addEventListener("click", (event) => {
  document.querySelector("[data-search-overlay]").close();
});

buttons.settingsButton.addEventListener('click', settingsEvents)

buttons.settingsCancel.addEventListener('click', settingsEvents)

buttons.moreButton.innerHTML = /* html */
    `<span>Show more</span>
    <span class="list__remaining">${
      matches.length - [page * BOOKS_PER_PAGE] > 0
        ? matches.length - [page * BOOKS_PER_PAGE]
        : 0
}</span>`;

buttons.moreButton.addEventListener('click', moreBooks) 

buttons.themeSettings.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';

buttons.saveSettings.addEventListener('submit', themeUpdate)

const genresList = document.createDocumentFragment()
let elementGenre = 'All Genres'
buttons.searchGenres.innerHTML = `<option>${elementGenre}</option>`

buttons.searchGenres.appendChild(genresList);

for (let [genreID, genreName] of Object.entries(genres)) {
    let genreOption = document.createElement("option");
    genreOption.innerText = `${genreName}`
    genreOption.value = genreID
    genresList.appendChild(genreOption)
}

buttons.searchGenres.appendChild(genresList);

const authorList = document.createDocumentFragment()
let elementAuthors = 'All Authors'
buttons.authorsOptions.innerHTML = `<option>${elementAuthors}</option>`;

for (let [id, name] of Object.entries(authors)) {
    let authorOption = document.createElement('option')
    authorOption.innerText = `${name}`
    authorOption.value = id
    authorList.appendChild(authorOption)
}

buttons.authorsOptions.appendChild(authorList)

buttons.bookPreviewClose.addEventListener('click', singleBookPreview)

// data-settings-form.submit() { actions.settings.submit }
// data-list-close.click() { data-list-active.open === false }



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
    

//     data-list-items.innerHTML = ''
//     const fragment = document.createDocumentFragment()
//     const extracted = source.slice(range[0], range[1])

//     for ({ author, image, title, id }; extracted; i++) {
//         const { author: authorId, id, image, title } = props

//         element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)

//         element.innerHTML = /* html */ `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[authorId]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }
    
//     data-list-items.appendChild(fragments)
//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     data-list-button.disabled = initial > 0

//     data-list-button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false
// }

// data-settings-overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data-settings-overlay).open === false
// }

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
    
//     if !active return
//     data-list-active.open === true
//     data-list-blur + data-list-image === active.image
//     data-list-title === active.title
    
//     data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
//     data-list-description === active.description
// }