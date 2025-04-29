function Header() {
    return(
        <header className="header-container">
        <div className="container-fluid p-0">
          <div className="header-image-container">
            <div className="text-center">
            <img
              src="/img_minimalist_cat.jpg" 
              alt="Header Background"
              className="img-fluid"
              id="mainImage"
            />
            <h1 className="display-3">Miumiu's Bookstore</h1>
            <p id="headerText">Create your own book collection</p>
            </div>
          </div>
        </div>
      </header>
    );
}

export default Header;