//This component render the main page with the three shelves
import React, { Component } from 'react'
import './App.css'
import Search from './SearchApp.js'
import * as BooksAPI from './BooksAPI.js'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Book from './book.js'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booksOnShelves: JSON.parse(localStorage.getItem('booksOnShelves')) || [],
      currentBooks: [],
      wantToRead: [],
      read : [],
      shelf: '',
      updated: [],
    };
    this.updateShelf = this.updateShelf.bind(this);
  }
  //The function get the books from the API or from the localStorage and display them on the correct shelf
  getBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({booksOnShelves: books}, () => localStorage.setItem('booksOnShelves', JSON.stringify(this.state.booksOnShelves)));
      for (var book of books) {
        if(book.shelf === 'currentlyReading') {
          this.setState({currentBooks: this.state.currentBooks.concat([book])});
          localStorage.setItem('currentBooks', JSON.stringify(this.state.currentBooks));
        } else if (book.shelf === 'wantToRead') {
          this.setState({wantToRead: this.state.wantToRead.concat([book])});
          localStorage.setItem('wantToRead', JSON.stringify(this.state.wantToRead));
        } else if(book.shelf === 'read') {
          this.setState({read: this.state.read.concat([book])});
          localStorage.setItem('read', JSON.stringify(this.state.read));
        }
      } 
    });
  } 
  componentWillMount() {
    document.title = 'Library | My Reads';
  }
  componentDidMount() {
    if (this.state.booksOnShelves.length === 0) {
      this.getBooks();
    } else {
      this.setState({booksOnShelves: JSON.parse(localStorage.getItem('booksOnShelves'))});
      this.setState({currentBooks: JSON.parse(localStorage.getItem('currentBooks'))});
      this.setState({wantToRead: JSON.parse(localStorage.getItem('wantToRead'))});
      this.setState({read: JSON.parse(localStorage.getItem('read'))});
    }
  }
  //The function update the shelves once a book is moved
  updateShelf(e, book) {
    if (e === 'currentlyReading') {
      book.shelf = "currentlyReading";
      this.currentListAddItem(book.id, book);
    } else if (e === 'wantToRead') {
      book.shelf = 'wantToRead';
      this.wantToListAddItem(book.id, book);
    } else if (e === 'read') {
      book.shelf = 'read';
      this.readListAddItem(book.id, book);
    } else if (e === 'none'){
      this.booksOnShelvesRemoveItem(book.id);
      this.currentListRemoveItem(book.id);
      this.readListRemoveItem(book.id);
      this.wantToListRemoveItem(book.id);
    }
  }
  //Add a book to the BooksOnShelves localStorage
  booksOnShelvesAddItem(id, book) {
    var bookAlreadyIn = this.state.booksOnShelves.some(function(el) {
      return el.id === id
    });
    if (!bookAlreadyIn) {
      this.setState({booksOnShelves: this.state.booksOnShelves.concat([book])}, () => 
      localStorage.setItem('booksOnShelves', JSON.stringify(this.state.booksOnShelves)));
    }
  }
  //Remove a book from the BooksOnShelves localstorage
  booksOnShelvesRemoveItem(id) {
    const list = this.state.booksOnShelves.filter(book => book.id !== id);
    this.setState({booksOnShelves: list});
    localStorage.setItem('booksOnShelves', JSON.stringify(this.state.booksOnShelves));
  }
  //Add the book to the currentBooks localstorage and remove it from the others shelves
  currentListAddItem(id, book) {
    var currentFound = this.state.currentBooks.some(function(el) {
        return el.id === id
      });
    if( !currentFound) {
      this.setState({currentBooks: this.state.currentBooks.concat([book])});
      const l = this.state.currentBooks;
      localStorage.setItem('currentBooks', JSON.stringify(l));
      this.wantToListRemoveItem(book.id);
      this.readListRemoveItem(book.id);
      this.booksOnShelvesAddItem(book.id, book);

    }
  }
  //Remove the book from the currenBooks localstorage
  currentListRemoveItem(id) {
    const currentList = this.state.currentBooks.filter(book => book.id !== id);
    this.setState({currentBooks: currentList});
    localStorage.setItem('currentBooks', JSON.stringify(this.state.currentBooks));
  }
  //Add the book to the wantToRead localstorage and remove it from the others shelves and storages
  wantToListAddItem(id, book) {
    var wantToReadFound = this.state.wantToRead.some(function(el) {
        return el.id === id
      });
    if (!wantToReadFound) {
      this.setState({wantToRead: this.state.wantToRead.concat([book])});
      const p = this.state.wantToRead;
      localStorage.setItem('wantToRead', JSON.stringify(p));
      this.currentListRemoveItem(book.id);
      this.readListRemoveItem(book.id);
      this.booksOnShelvesAddItem(book.id, book);
    }
  }
  //Remove the book from the wantToRead localstorage
  wantToListRemoveItem(id) {
    const wantToList = this.state.wantToRead.filter(book => book.id !== id);
    this.setState({wantToRead: wantToList});
    localStorage.setItem('wantToRead', JSON.stringify(this.state.wantToRead));
  }
  //Add the book to the read localstorage and remove it from the others shelves and storages
  readListAddItem(id, book) {
    var readFound = this.state.read.some(function(el) {
        return el.id === id
      });
    if (!readFound) {
      this.setState({read: this.state.read.concat([book])});
      const m = this.state.read;
      localStorage.setItem('read', JSON.stringify(m));
      this.currentListRemoveItem(book.id);
      this.wantToListRemoveItem(book.id);
      this.booksOnShelvesAddItem(book.id, book);
    }
  }
  //Remove book from the read localstorage
  readListRemoveItem(id) {
    const readList = this.state.read.filter(book => book.id !== id);
    this.setState({read: readList});
    localStorage.setItem('read', JSON.stringify(this.state.read));
  }
 
  render() {
    return (
      <div className="App">
        <Route exact path='/' render={()=> (
          <div className='main'>
            <header className="App-header">
              <h1 className="App-title" tabIndex="0">My Reads</h1>
              <Link to='/Search' className='search-button' role='navigation' >Add a book</Link>
            </header>
            <div className="shelves">
              <div className='current'>
                <h2 tabIndex='0'>Currently reading</h2>
                {this.state.booksOnShelves.length > 0 ? 
                  (<div className='current-readings'>{this.state.currentBooks.map((book) => 
                  <Book updateShelf={this.updateShelf} className="book-element" key={book.id} book={book} currentBooks={this.state.currentBooks}/>)}</div>)
                  : (<p>Your shelf is empty</p>)}
              </div>
              <div className="wants">
                <h2 tabIndex='0'>Want to read</h2>
                {this.state.booksOnShelves.length >0 ? 
                  (<div className="want-to">{this.state.wantToRead.map((book) => 
                  <Book updateShelf={this.updateShelf} className="book-element" key={book.id} book={book} />)}</div>)
                  : (<p>Your shelf is empty</p>)}
              </div>
              <div className="reads">
                <h2 tabIndex='0'>Read</h2>
                {this.state.booksOnShelves.length > 0 ? 
                  (<div className='read'>{this.state.read.map((book) => 
                  <Book updateShelf={this.updateShelf} className="book-element" key={book.id} book={book} />)}</div>)
                  : (<p>Your shelf is empty</p>)}
              </div>
            </div>
            <footer></footer>      
          </div>
        )}/>
        <Route exact path='/Search' render={(props) => <Search {...props} updateShelf={this.updateShelf.bind(this)} books={this.state.booksOnShelves} />} />
      </div>
    );
  }
};


export default App;
