import React, {Component} from 'react';
import Menu from './menu.js';
import InfoBox from './infobox.js';
import * as BooksAPI from './BooksAPI.js';

class Book extends Component {
	constructor(props) {
		super(props);
		this.state = {
      selectedShelf: 'none',  		
		};
		this.changeShelf = this.changeShelf.bind(this);
	}
	//When the component is mounted, it calls a function to give each book a shelf
	componentDidMount() {
		this.setShelf();
	}
	
	setShelf() {
		if(this.props.book.shelf === 'currentlyReading') {
			this.setState({selectedShelf: 'currentlyReading'});
		} else if(this.props.book.shelf === 'wantToRead') {
			this.setState({selectedShelf: 'wantToRead'});
		} else if (this.props.book.shelf === 'read') {
			this.setState({selectedShelf: 'read'});
		} else {
			this.setState({selectedShelf: this.state.selectedShelf});
		} 
	}
	//This function is called in the Menu component when an item is moved to a shelf
	changeShelf(e,book) {
		this.setState({selectedShelf: e});
		BooksAPI.update(this.props.book.id, e).then((books)=> {
			this.props.updateShelf(this.state.selectedShelf, this.props.book);
			if(e === 'currentlyReading') {
				this.props.book.shelf = 'currentlyReading';
				books.currentlyReading.push(this.props.book.id);
			} else if( e === 'wantToRead') {
				this.props.book.shelf = 'wantToRead';
				books.wantToRead.push(this.props.book.id);
			} else if (e === 'read') {
				this.props.book.shelf = 'read';
				books.read.push(this.props.book.id);
			}
		});
	} 
	
	render() {
		return (
			<div className="book">
				{this.props.book.imageLinks ? 
					(<img src={this.props.book.imageLinks.thumbnail} alt={'cover of ' + this.props.book.title} className="book-cover"/>) :
					(<p>No picture available</p>)}
        			<h3 tabIndex='0' className="book-content">{this.props.book.title}</h3>
        			<h4 tabIndex='0' className="book-content content">{this.props.book.authors}</h4>
       				<p tabIndex='0' className="book-content content">{this.props.book.publishedDate}</p>
        			<p className="book-content content">{this.props.book.publishers}</p>
        			<InfoBox book={this.props.book} role='menu' aria-expanded='false' aria-label='more informations on the book'/>
        			<Menu id={this.props.book.id} role='menu' aria-expanded='false' aria-label='move the book to a shelf' changeShelf={this.changeShelf} selectedShelf={this.state.selectedShelf}/>
      			</div>
		)
	}
}

export default Book
