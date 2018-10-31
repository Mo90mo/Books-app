//This component just map through the books array and render them on the page
import React, {Component} from 'react'
import './Search.css'
import Menu from './dropdown-menu.js'


class BooksTable extends Component {
	render() {
		return (
			<div className='booksTable'>
			{this.props.books.map((book) => (
				<div key={book.id} className='book' shelf={this.props.shelf}>
					<img src={book.imageLinks.thumbnail} alt='book cover' />
					<Menu id={book.id}/>
					<h3>{book.title}</h3>
					<p>{book.subtitle}</p>
					<p>{book.authors}</p>
					<p>{book.publishers}</p>
				</div>
			))}
			</div>
		)
	}
}

export default BooksTable