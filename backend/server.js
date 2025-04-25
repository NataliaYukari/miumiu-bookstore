require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
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
app.get('/books', (req, res) => {
    const books = getBooks();
    res.json(books);
});

//Adds a new book to the JSON file
app.post('/books', (req, res) => {
    const books = getBooks();
    const newBook = req.body;
    books.push(newBook);
    saveBooks(books);
    res.status(201).json({ message: 'New book added!' });
});

//Updates a book 
app.put('/books/:id', (req, res) => {
    const books = getBooks();
    const id = req.params.id;
    const newData = req.body;
    const updatedBooks = books.map(book => (book.id === id ? newData : book));
    saveBooks(updatedBooks);
    res.json({ message: 'The book was updated successfully!' });
});

//Deletes a book
app.delete('/books/:id', (req, res) => {
    const books = getBooks();
    const id = req.params.id;
    const updatedBooks = books.filter(book => book.id != id);
    saveBooks(updatedBooks);
    res.json({ message: 'The book was deleted sucessfully!' });
});

app.get('/', (req, res) => {
    res.send('API working!');
  });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});