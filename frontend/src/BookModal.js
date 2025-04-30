import React from "react";
import EditBookModal from "./EditBookModal.js";

function BookModal({ show, onHide, book, onEdit }) {
    if (!show) return null;

    return (
        <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{book.title}</h5>
                            <button type="button" className="btn-close" onClick={onHide} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col md-4 text-center">
                                <img
                                src= {book.coverImage}
                                alt= {book.title}
                                className="img-fluid rounded mb-4"
                                ></img>
                                <p><a href={book.shoppingLink} target="_blank" rel="noopener noreferrer" id="buyHere"><b>Buy here!</b></a></p>
                            </div>

                            <div className="col-md-8" id="bookModalText">
                                <p><b>Author:</b> {book.author}</p>
                                <p><b>Description:</b> {book.description}</p>
                                <p><b>ISBN:</b> {book.isbn}</p>
                                <p><b>Publisher:</b> {book.publisher}</p>
                                <p><b>Edition:</b> {book.edition}</p>
                                <p><b>Year:</b> {book.year}</p>
                                <p><b>Pages:</b> {book.pages}</p>
                                
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        
                        <button type="button" className="btn btn-primary" id="bookEditButton" onClick={() => onEdit(book)}>
                            <i className= "bi bi-pencil-square"></i>
                        </button>
                        <button type="button" className="btn btn-secondary" id="bookCloseButton" onClick={onHide}>Close</button>
                    </div>
                </div>
            </div>
        </div>  
)};

export default BookModal;