function AddBook() {
    const handleButtonAddBook = () => {
        //const fs = require('fs')
        const bookList = './booksData.json'
        const newBook = {}
    };
    return (
        <div className="fixed-bottom">
        <div className="d-flex justify-content-center bg-dark p-3">
          <button
            className="btn btn-primary"
            onClick={handleButtonAddBook}
          >
            Add new book!
          </button>
        </div>
      </div>
    );
}
export default AddBook;