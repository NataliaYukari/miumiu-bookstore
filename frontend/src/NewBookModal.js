import React from "react";
import { useState } from "react";

function NewBookModal({ show, handleClose, onBookAdded }) {
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        description: '',
        isbn: '',
        publisher: '',
        edition: '',
        year: '',
        pages: '',
        shoppingLink: '',
        coverImage: '',
    });

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:5000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });

            if (response.ok)
        }
    }

    const fields = [
        { label: "Title", name: "title" },
        { label: "Author", name: "author" },
        { label: "Description", name: "description" },
        { label: "ISBN", name: "isbn" },
        { label: "Publisher", name: "publisher" },
        { label: "Edition", name: "edition" },
        { label: "Year", name: "year" },
        { label: "Pages", name: "pages" },
        { label: "Shopping Link", name: "shoppingLink" },
        { label: "Cover Image", name: "coverImage" }
      ]

    return (
        <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add new book</h5>
                            <button type="button" class="btn-close" onClick={onHide} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {fields.map((field) => (
                            <div key={field.name} className="mb-3">
                                <label htmlFor={field.name} className="form-label">
                                    {field.label}:
                                </label>
                                <input
                                    type= "text"
                                    name= {field.name}
                                    id= {field.name}
                                    className= "form-control"
                                    value= {editedBook?.[field.name] || ''}
                                    onChange= {handleChange} 
                                >
                                </input>
                            </div>
                        ))}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHide}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewBookModal;