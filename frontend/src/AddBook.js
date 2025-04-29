import React from "react";
import { useState } from "react";
import NewBookModal from "./NewBookModal";

function AddBook({ onAddSuccess }) {
  const [showNewBookModal, setShowNewBookModal] = useState(false);

    const handleButtonAddBook = () => {
        setShowNewBookModal(true);
    };
    return (
      <div className="fixed-bottom">
        <div className="d-flex justify-content-center p-3" id="addBookBar">
          <button
          id="addBookButton"
            className="btn"
            onClick={handleButtonAddBook}
          >
            Add new book!
          </button>
        </div>

        <NewBookModal
          show={showNewBookModal}
          onHide={() => setShowNewBookModal(false)}
          onBookAdded={(book) => {
            console.log("Novo livro:", book);
          }}
          onAddSuccess= {onAddSuccess}
        />
      </div>
    );
}
export default AddBook;