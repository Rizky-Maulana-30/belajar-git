// script.js
let books = JSON.parse(localStorage.getItem('books')) || [];

const unfinishedBooksList = document.getElementById('unfinished-books');
const finishedBooksList = document.getElementById('finished-books');
const addBookForm = document.getElementById('add-book-form');

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const bookTitle = document.getElementById('book-title').value.trim();
    const bookAuthor = document.getElementById('book-author').value.trim();
    const bookYear = parseInt(document.getElementById('book-year').value.trim());
    if (bookTitle && bookAuthor && bookYear) {
        const newBook = {
            id: Date.now(),
            title: bookTitle,
            author: bookAuthor,
            year: bookYear,
            isComplete: false
        };
        books.push(newBook);
        localStorage.setItem('books', JSON.stringify(books));
        renderBooks();
        document.getElementById('book-title').value = '';
        document.getElementById('book-author').value = '';
        document.getElementById('book-year').value = '';
    }
});

function renderBooks() {
    unfinishedBooksList.innerHTML = '';
    finishedBooksList.innerHTML = '';
    books.forEach((book) => {
        const bookListItem = document.createElement('li');
        bookListItem.textContent = `${book.title} by ${book.author} (${book.year})`;
        bookListItem.setAttribute('data-book-id', book.id);
        if (book.isComplete) {
            finishedBooksList.appendChild(bookListItem);
        } else {
            unfinishedBooksList.appendChild(bookListItem);
        }
        const moveButton = document.createElement('button');
        moveButton.textContent = book.isComplete ? 'Pindah ke Belum Selesai' : 'Pindah ke Sudah Selesai';
        moveButton.addEventListener('click', () => {
            book.isComplete = !book.isComplete;
            localStorage.setItem('books', JSON.stringify(books));
            renderBooks();
        });
        bookListItem.appendChild(moveButton);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.addEventListener('click', () => {
            const index = books.findIndex((b) => b.id === book.id);
            if (index !== -1) {
                books.splice(index, 1);
                localStorage.setItem('books', JSON.stringify(books));
                renderBooks();
            }
        });
        bookListItem.appendChild(deleteButton);
    });
}

renderBooks();