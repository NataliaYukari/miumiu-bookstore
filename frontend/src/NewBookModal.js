import React from "react";
import { useState } from "react";

function NewBookModal({ show, onHide, onBookAdded, onAddSuccess }) {
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

            if (response.ok) {
                const data = await response.json();
                console.log('Livro adicionado!', data);
        
                if (onBookAdded) {
                  onBookAdded(data.book);
                }
        
                setNewBook({
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
                onAddSuccess();
                onHide();

            } else {
                console.error('Error in adding a new book');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBook((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    const fields = [
        { name: 'title', label: 'Title' },
        { name: 'author', label: 'Author' },
        { name: 'description', label: 'Descriptions' },
        { name: 'isbn', label: 'ISBN' },
        { name: 'publisher', label: 'Publisher' },
        { name: 'edition', label: 'Edition' },
        { name: 'year', label: 'Year' },
        { name: 'pages', label: 'Pages' },
        { name: 'shoppingLink', label: 'Shopping link' },
        { name: 'coverImage', label: 'Cover image' },
    ];

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
                                    value= {newBook?.[field.name] || ''}
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