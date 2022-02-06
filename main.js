let bookSubmit = document.getElementById("bookSubmit");
let inputBookTitle = document.getElementById("inputBookTitle");
let inputBookAuthor = document.getElementById("inputBookAuthor");
let inputBookYear = document.getElementById("inputBookYear");
let inputBookIsComplete = document.getElementById("inputBookIsComplete");
let formInputBook = document.getElementById("inputBook");
let searchBookTitle = document.getElementById("searchBookTitle");
let bookItem = document.getElementsByClassName("book_item");

searchBookTitle.onkeyup = () => searchBook();

// Strore Book
bookSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  let books = JSON.parse(localStorage.getItem("books"));

  booksJSON = {
    id: +new Date(),
    title: inputBookTitle.value,
    author: inputBookAuthor.value,
    year: inputBookYear.value,
    isComplete: inputBookIsComplete.checked ? true : false,
  };

  books.push(booksJSON);
  localStorage["books"] = JSON.stringify(books);

  location.reload();
});

// Get All Books
let incompleteBookList = document.getElementById("incompleteBookshelfList");
let completeBookList = document.getElementById("completeBookshelfList");
let books = JSON.parse(localStorage.getItem("books"));

// Create article
books.map((book) => {
  const articleBookItem = document.createElement("article");
  const title = document.createElement("h3");
  const penulis = document.createElement("p");
  const tahun = document.createElement("p");
  const divAction = document.createElement("div");
  const buttonGreen = document.createElement("button");
  const buttonRed = document.createElement("i");

  articleBookItem.classList.add("book_item");
  articleBookItem.setAttribute("id", `${book.id}`);
  articleBookItem.appendChild(title);
  articleBookItem.appendChild(penulis);
  articleBookItem.appendChild(tahun);
  articleBookItem.appendChild(divAction);
  divAction.classList.add("action");
  divAction.appendChild(buttonGreen);
  buttonGreen.classList.add("green");
  buttonGreen.onclick = () => {
    if (book.isComplete) {
      notFinishedReading(book.id);
    } else {
      finishedReading(book.id);
    }
  };
  divAction.appendChild(buttonRed);
  buttonRed.classList.add("fa", "fa-trash");
  buttonRed.onclick = () => deleteBook(book.id);

  title.innerText = book.title;
  penulis.innerText = book.author;
  tahun.innerText = book.year;
  buttonGreen.innerText = book.isComplete
    ? "Belum selesai di Baca"
    : "Selesai dibaca";

  book.isComplete
    ? completeBookList.appendChild(articleBookItem)
    : incompleteBookList.appendChild(articleBookItem);
});

function finishedReading(id) {
  books.map((book) => {
    if (book.id == id) {
      book.isComplete = true;
    }
  });

  localStorage["books"] = JSON.stringify(books);
  location.reload();
}

function notFinishedReading(id) {
  books.map((book) => {
    if (book.id == id) {
      book.isComplete = false;
    }
  });

  localStorage["books"] = JSON.stringify(books);
  location.reload();
}

// Delete Book by Id
function deleteBook(id) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].id === id) {
      books.splice(i, 1);
    }
  }

  localStorage["books"] = JSON.stringify(books);
  location.reload();
}

// Search Book
function searchBook() {
  let input = searchBookTitle.value;
  input = input.toLowerCase();

  for (let i = 0; i < bookItem.length; i++) {
    if (!bookItem[i].childNodes[0].innerHTML.toLowerCase().includes(input)) {
      bookItem[i].style.display = "none";
    } else {
      bookItem[i].style.display = "";
    }
  }
}
