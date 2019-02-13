import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI.js'
import Book from './book.js'
import './App.css'
import ErrorBoundaries from './errorboundaries.js'
import { Link } from 'react-router-dom'

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showBooks: false,
			searchedBooks: [],
			query: '',
		}
		this.handleSearch = this.handleSearch.bind(this);
	}

	componentWillMount() {
		document.title = 'Search | My Reads';
	}
	componentWillUnmount() {
		document.title = 'Library | My Reads';
	}
	//The function checks for valid input query and call the API request
	handleSearch(e) {
		this.setState({query: this.search.value}, () => {
			if (this.state.query && this.state.query.length > 0) {
					this.getBooks();
			} else {
				this.coverBooks();
			}
		})
	} 
	//This function checks if the book is already on a shelf
  compare(arr1,arr2) {
  	for (var i = 0; i < arr2.length; i++) {
  		for (var k = 0; k < arr1.length; k++) {
  			if (arr2[i].id === arr1[k].id) {
    			if(arr2[i].shelf === 'currentlyReading') {
    				arr1[k].shelf = 'currentlyReading';
    			} else if(arr2[i].shelf === 'wantToRead') {
    			 	arr1[k].shelf = 'wantToRead';
    			} else if (arr2[i].shelf === 'read') {
    				arr1[k].shelf = 'read';
    			}
    		} 
   	 	}
		}
  }
  //The function search in the API for books that match the query
  getBooks() {
  	BooksAPI.search(this.state.query).then((books) => {
  		if(books.length > 0) {
  			this.compare(books, this.props.books)
  			this.setState({searchedBooks: books, showBooks: true});
  		} else {
  			this.setState({showBooks: false});
  		}
  	})
  }
  coverBooks() {
  	this.setState({showBooks: false})
  }
	
	render() {
		return(
			<div className='all'>
				<header className="alternative-header">
					<h1>My Reads</h1>
					<Link to='./' className='gotolibrary-button' role='navigation'>To your library</Link>                                                                                                                                                      
				</header>
				<input 
					role="search"
					className="search-bar"
					ref={input => this.search = input}
  				placeholder='Search books' 
  				onChange={this.handleSearch}>
  			</input>
  			<div className='empty-page'>
  				{this.state.showBooks === false ? (<p className="no-results">No results found</p>)
  					: (<div className='results'>{this.state.searchedBooks.map((book) => 
  						<ErrorBoundaries key={book.id}>
  						<Book updated={this.state.updated} updateShelf={this.props.updateShelf} pushOnShelf={this.pushOnShelf} key={book.id} book={book} books={this.state.books}/>
  						</ErrorBoundaries>)}</div>)
  				}
				</div>
  			<footer></footer>	
			</div>	
		)
	}
}

export default Search