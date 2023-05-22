class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
let count = 1;

class UI {
    addBook(book) {
        let tbody = document.getElementById('bookList');
        let row = document.createElement('tr');

        row.innerHTML = `
        <td>${count}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `

        tbody.appendChild(row);
    }

    showAlert(message, className) {
        // Create Div
        let div = document.createElement('div');

        // Giving className
        div.className = `alert ${className}`;


        // Append Message
        div.appendChild(document.createTextNode(message));


        // Get Container
        let container = document.querySelector('#libraryContainer');

        // Get Form ID
        let form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        // SetTimeOut
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 1000)
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

const ui = new UI();

document.getElementById('book-form').addEventListener('submit', function(e) {

    e.preventDefault();

    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let ISBN = document.getElementById('isbn').value;

    const book = new Book(title, author, ISBN);
    
    if (title == '' || author == '' || ISBN == '') {
        ui.showAlert('Please fill all the fields', 'error');
    } 
    else {
        // Add Book
        ui.addBook(book);
        count++;
        // Added Book Message
        ui.showAlert('Book Added', 'success');
        ui.clearFields();
    }
})

document.getElementById('bookList').addEventListener('click', function(e) {
    e.preventDefault();
    ui.deleteBook(e.target);
    ui.showAlert('Book Romoved', 'success');
})