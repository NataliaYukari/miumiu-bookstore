require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'booksData.json');

app.use(cors());
app.use(express.json());

const getBooks = () => {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
};

const saveBooks = (books) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2));
}

//Reads the data on the JSON file
app.get('/', (req, res) => {
    const books = getBooks();
    res.json(books);
});

//Adds a new book to the JSON file
app.post('/', (req, res) => {
    const books = getBooks();
    const newBook = req.body;

    const lastId = books.length > 0 ? Math.max(...books.map(book => parseInt(book.id))) : 0;
    const nextId = lastId + 1;
    newBook.id = nextId;

    books.push(newBook);
    saveBooks(books);
    res.status(201).json({ message: 'New book added!' });
});

//Updates a book 
app.put('/:id', (req, res) => {
    const books = getBooks();
    const id = parseInt(req.params.id);
    const newData = req.body;
    const updatedBooks = books.map(book => (book.id === id ? newData : book));
    saveBooks(updatedBooks);
    res.json({ message: 'The book was updated successfully!' });
});

//Deletes a book
app.delete('/:id', (req, res) => {
    const books = getBooks();
    const id = parseInt(req.params.id);
    const updatedBooks = books.filter(book => book.id !== id);
    saveBooks(updatedBooks);
    res.json({ message: 'The book was deleted sucessfully!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});