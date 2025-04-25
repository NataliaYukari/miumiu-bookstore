import booksData from './booksData.json'
import React, { useState } from 'react';

function BookList() {
    const [books] = useState(booksData)
    return (
        <div className="container mt-4">
        <div className="row">
          {booksData.map((book) => (
            <div className="col-12 col-md-4 mb-4" key={book.title}>
              <div className="card d-flex flex-row h-100">
                <img src={book.coverImage} className="card-img-left w-25" alt={book.title}/>
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">{book.author}</p>
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary"
                //onClick={() => handleAlterBook(book.isbn)}
                  >
                    <i className= "bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    //onClick={() => handleDeleteBook(book.isbn)}
                  >
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default BookList;