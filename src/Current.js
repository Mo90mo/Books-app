import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI.js'

class Current extends Component {
	render() {
    	return (

   			<div className="current-readings" currentBooks={this.props.currentBooks}>

          		<h2>Currently readings</h2>
          		{this.props.currentBooks.map((book) => 
          			<div className='books-list'>
					<img src={book.imageLinks.thumbnail} alt='book cover' />
					<h3>{book.title}</h3>
					<p>{book.subtitle}</p>
					<p>{book.authors}</p>
					<p>{book.publishers}</p>
					</div>
          			)}
          		
          		
        	</div>
    	)
  }
}

export default Current;