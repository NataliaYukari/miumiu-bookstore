import React, { useState } from "react";
import { useEffect } from "react";

function EditBookModal({show, onHide, book, onSave}) {
    const [editedBook, setEditedBook] = useState({...book});

    useEffect(() => {
        setEditedBook(book || {}); 
      }, [book]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedBook((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleSave = () => {
        onSave(editedBook);
      };

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

    if (!show) return null;
    
    return (
        <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editing {book.title}</h5>
                            <button type="button" class="btn-close" onClick={onHide} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {fields.map((field) => (
                            <div key={field.name} className="mb-3">
                                <label htmlFor={field.name} className="form-label" class="modalLabel">
                                    {field.label}:
                                </label>
                                <input
                                    type= "text"
                                    name= {field.name}
                                    id= {field.name}
                                    className= "form-control"
                                    placeholder= {book?.[field.name] || ''}
                                    value= {editedBook?.[field.name] || ''}
                                    onChange= {handleChange} 
                                >
                                </input>
                            </div>
                        ))}
                    </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" id="editBookCloseButton" onClick={onHide}>Close</button>
                    <button type="button" className="btn btn-primary"  id="editBookSaveButton" onClick={handleSave}>Save changes</button>
                </div>
            </div>
        </div>
    </div>
)};

export default EditBookModal;