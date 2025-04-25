require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const POSTS_FILE = path.join(__dirname, 'booksData.json');

app.use(cors());
app.use(express.json());

let books = [];

//Return the data on the JSON file
app.get('/books', (req, res) => res.json(books));

//Adds a new book to the JSON file
app.post('/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
});

