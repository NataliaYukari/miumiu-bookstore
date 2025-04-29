import React from "react";

function DeleteModal({show, onHide, book, onDelete}) {
    const handleDelete = () => {
        onDelete(book.id)
    };

    return (
        <div class={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{book?.title}</h5>
                        <button type="button" class="btn-close" onClick={onHide} aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p><b>Delete {book?.title}? </b></p>
                        <p>This action cannot be undone!</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onClick={onHide}>Close</button>
                        <button type="button" class="btn btn-danger" onClick={handleDelete}>Delete the book</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;