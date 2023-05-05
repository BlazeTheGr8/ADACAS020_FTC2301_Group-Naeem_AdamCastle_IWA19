// @ts-nocheck
import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";
import { fragment, matches } from "./scripts.js";
let page = 0;

export const buttons = {
    searchButton: document.querySelector("[data-header-search]"),
    cancelSearch: document.querySelector("[data-search-cancel]"),
    settingsButton: document.querySelector("[data-header-settings]"),
    settingsCancel: document.querySelector("[data-settings-cancel]"),
    settingsForm: document.querySelector("[data-settings-overlay]"),
    saveSettings: document.querySelector("[data-settings-form]"),
    dataListItems: document.querySelector("[data-list-items]"),
    moreButton: document.querySelector("[data-list-button]"),
    themeSettings: document.querySelector('[data-settings-theme]'),
    themeChoice: document.querySelector("[data-settings-theme]"),
    searchGenres: document.querySelector("[data-search-genres]"),
    authorsOptions: document.querySelector("[data-search-authors]"),
    searchForm: document.querySelector('[data-search-form]'),
    singleBook: document.querySelectorAll('.preview'),
    bookPreview: document.querySelector('[data-list-active]'),
    bookPreviewClose: document.querySelector('[data-list-close]'),
    bookPreviewImage: document.querySelector('[data-list-image]'),
    bookPreviewTitle: document.querySelector('[data-list-title]'),
    bookPreviewSubtitle: document.querySelector('[data-list-subtitle]'),
    bookPreviewDescription: document.querySelector('[data-list-description]'),
    bookPreviewBlur: document.querySelector('[data-list-blur]')
}

const day = {
  dark: "10, 10, 20",
  light: "255, 255, 255",
};

const night = {
  dark: "255, 255, 255",
  light: "10, 10, 20",
};

export const singleBookPreview = (event) => {
    const { target } = event;
    if (buttons.bookPreview.open === false) {
    buttons.bookPreview.showModal();
  } else if (target === buttons.bookPreviewClose) {
    buttons.bookPreview.close();
    }
    for (let book of books) {
        if (
          target.getAttribute("data-preview") === book.id ||
          target.parentNode.parentNode.getAttribute("data-preview") === book.id ||
          target.parentNode.getAttribute("data-preview") === book.id
        ) {
          buttons.bookPreviewImage.src = book.image;
          buttons.bookPreviewBlur.src = book.image;
          buttons.bookPreviewTitle.textContent = book.title;
          buttons.bookPreviewSubtitle.textContent = `${
            authors[book.author]
          } (${new Date(book.published).getFullYear()})`;
          buttons.bookPreviewDescription.textContent = book.description;
        }
    }
};

export const createPreviewsFragment = (matches, start = (page * BOOKS_PER_PAGE), end = (page + 1) * BOOKS_PER_PAGE) => {
    let extracted = matches.slice(start, end);
    page += 1
    for (const book of extracted) {
      const { author: authorId, id, image, title } = book;

      let preview = document.createElement("button");
      preview.classList = "preview";
      preview.setAttribute("data-preview", id);
      preview.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `;

      fragment.appendChild(preview);
    }
    return fragment
};

export const settingsEvents = (event) => {
  const { target } = event;
  if (buttons.settingsForm.open === false) {
    buttons.settingsForm.showModal();
  } else if (target === buttons.settingsCancel) {
    buttons.settingsForm.close();
  }
};

export const themeUpdate = (event) => {
    event.preventDefault()
    let css = buttons.themeChoice.value;
    if (css === 'day') {
        document.documentElement.style.setProperty("--color-dark", day.dark);
        document.documentElement.style.setProperty("--color-light", day.light);
    } else if (css === "night") {
        document.documentElement.style.setProperty("--color-dark", night.dark);
        document.documentElement.style.setProperty("--color-light", night.light);
    }
    document.querySelector("[data-settings-overlay]").close();
}

export const moreBooks = (event) => {
    buttons.dataListItems.appendChild(createPreviewsFragment(matches))
    buttons.singleBook = document.querySelectorAll(".preview");
    for (let button of buttons.singleBook) {
      button.addEventListener("click", singleBookPreview);
    }
    buttons.moreButton.textContent = `Show more (${books.length - (BOOKS_PER_PAGE * page)})`;
    if (matches.length - page * BOOKS_PER_PAGE <= 0) {
        buttons.moreButton.disabled = true;
        buttons.moreButton.textContent = `Show more (0)`;
    } else {buttons.moreButton.disabled = false;}
}

