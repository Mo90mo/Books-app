//This component renders the input field and contains the search function
import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI.js'
import BooksTable from './booksTable.js'
import './Search.css'

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: [],
			books: []
		}	
	}

	handleChange(e) {
		this.setState({input: e.target.value});
		console.log(e.target.value)
  	}

  	// As soon as a valid input is given to the search bar, the component will search the API for 
  	//books containing the input and will store the results in the books state
	componentDidUpdate(prevProps, prevState) {
		const input = this.state.input;
		if (prevState.input !== this.state.input && input.length !== 0) {
			BooksAPI.search(input).then((books) => {
				this.setState({books: books});
			 	console.log(books);
			})
		} 
	}
	render() {
		return(
			<div className='all'>
				<header>
					<h1>MyReads</h1>
				</header>
				<input 
				type='search' 
  				placeholder='Search books' 
  				value={this.state.input}
  				onChange={this.handleChange.bind(this)}></input>
  				{this.state.books.length > 0 ? (<BooksTable books={this.state.books} />)
  				: (<p>No results found</p>)}	
			</div>
		)
	}
}

export default Search