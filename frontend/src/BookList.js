import React, { useState } from 'react';
import { useEffect } from 'react';
import BookModal from './BookModal.js';
import EditBookModal from './EditBookModal.js';
import DeleteModal from './DeleteModal.js';
import AddBook from './AddBook.js';

function BookList() {
  const [bookList, setBookList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editSelectedBook, setEditSelectedBook] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toDeleteBook, setToDeleteBook] = useState(null);
  const [showDeleteToast, setShowDeleteToast] = useState(false);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000");
      const data = await response.json();
      setBookList(data);

    } catch (error) {
      console.error("Error to find books: ", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);



  const handleUpdateBook = async (updatedBook) => {
    try {
      const response = await fetch(`http://localhost:5000/${updatedBook.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });

    if (response.ok) {
      setBookList((prevList) => 
        prevList.map((book) => (book.id === updatedBook.id ? updatedBook : book))
      )
      setShowToast(true)
      setShowEditModal(false)

    } else {
      console.error("Couldn't update the book");
    }
  } catch (error) {
    console.error("Error:", error)
  }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:5000/${bookId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBookList((prevList) => prevList.filter((book) => book.id !== bookId));
        setShowDeleteToast(true)
        setShowDeleteModal(false)

      } else {
        console.error("Error in deleting a book");
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };
   
  const handleCardClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleEditButtonClick = (book) => {
    setEditSelectedBook(book);
    setShowEditModal(true);
  }

  const handleEditFromBook = (book) => {
    setSelectedBook(null);
    setShowModal(false);

    setEditSelectedBook(book);
    setShowEditModal(true);
  }

  const handleDeleteButtonBook = (book) => {
    setToDeleteBook(book);
    setShowDeleteModal(true);
  }

  return (
    <div className="container mt-4" id='mainBody'>
      <div className="row">
        {bookList.map((book) => (
          <div className="col-12 col-md-4 mb-4" key={book.id}>
            <div 
              className="card d-flex flex-row h-100" 
              id='cardBody'
              style={{ cursor:"pointer", transition: "transform 0.2s" }}
              onClick={() => handleCardClick(book)}>
              <img src={ book.coverImage } className="card-img-left w-25" alt={book.title}/>
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">{book.author}</p>

                  <div className="d-flex justify-content-end">
                    <button
                    className="btn"
                    id='buttonEdit'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditButtonClick(book);
                    }}
                    >
                      <i className= "bi bi-pencil-square"></i>
                    </button>
                    <button
                    className="btn"
                    id='buttonDelete'
                    onClick={ (e) => {
                      e.stopPropagation();
                      handleDeleteButtonBook(book);
                    }}
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

    {showToast && (
      <div 
        className="toast-container position-fixed bottom-0 end-0 p-3" 
        style={{ zIndex: 9999 }}
      >
        <div className="toast show bg-success text-white">
          <div className="toast-header bg-success text-white">
            <strong className="me-auto">Sucess!</strong>
            <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
          </div>
          <div className="toast-body">
            Book updated with success!
          </div>
        </div>
      </div>
    )}

    {showDeleteToast && (
      <div 
        className="toast-container position-fixed bottom-0 end-0 p-3" 
        style={{ zIndex: 9999 }}
      >
        <div className="toast show bg-success text-white">
          <div className="toast-header bg-success text-white">
            <strong className="me-auto">Sucess!</strong>
            <button type="button" className="btn-close" onClick={() => setShowDeleteToast(false)}></button>
          </div>
          <div className="toast-body">
            Book deleted with success!
          </div>
        </div>
      </div>
    )}
      </div>

      <BookModal 
        show = {showModal}
        onHide = {() => setShowModal(false)}
        book= {selectedBook}
        onEdit = {handleEditFromBook} 
      />

      <EditBookModal
        show = {showEditModal}
        onHide = {() => setShowEditModal(false)}
        book= {editSelectedBook}
        onSave = {handleUpdateBook}
      />

      <DeleteModal
        show = {showDeleteModal}
        onHide = {() => setShowDeleteModal(false)}
        onDelete = {handleDeleteBook}
        book = {toDeleteBook}
      />

      <AddBook onAddSuccess={fetchBooks}/>
    </div>
    
  );
}

export default BookList;