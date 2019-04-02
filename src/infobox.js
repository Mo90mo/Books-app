import React, {Component} from 'react'

//This component renders the additional informations once the 'More info' is clicked
class InfoBox extends Component {
  constructor(props) {
		super(props);
		this.state = {
			showInfoBox: false,
		}
		this.openBox = this.openBox.bind(this);
		this.closeInfo = this.closeInfo.bind(this);
	}
	openBox() {
		this.setState(prevState => ({
      showInfoBox: !prevState.showInfoBox
    }));
	}
	closeInfo() {
		this.setState({showInfoBox: false});
	}
	render() {
		return(
			<div className="info">
        		<button className="open-info" role='menu' aria-expanded='false' aria-label='more informations on the book' onClick={this.openBox}>More Info</button>
          		<div className={this.state.showInfoBox ? 'info-box' : 'closed-info-box'} >
          		<div tabIndex='1' className="close-button" onClick={this.closeInfo}>Close</div>
          	<div className="informations">
          		<div className="first-column">
          			{this.props.book.imageLinks ? 
					       (<img tabIndex='0' src={this.props.book.imageLinks.thumbnail} alt='book cover'/>) :
					       (<p tabIndex='0'>No picture available</p>)}
                <div>
          			  <h4 tabIndex='0'>{this.props.book.title}</h4>
          			  {this.props.book.subtitle ? (<p tabIndex='0'>{this.props.book.subtitle}</p>) : null}
                </div>
          			<p tabIndex='0'>{this.props.book.authors}</p>
          			<p tabIndex='0'>{this.props.book.publishedDate}</p>
          			<p tabIndex='0'>{this.props.book.publishers}</p>
          		</div>
          		<div className="second-column">
          			{this.props.book.description ? (<p tabIndex='0'>{this.props.book.description}</p>) 
                  : (<p tabIndex='0'>There is no description available</p>)}
          			<p tabIndex='0'>Pages: {this.props.book.pageCount}</p>
          			{this.props.book.averageRating ? (<p tabIndex='0'>Rating: {this.props.book.averageRating} (based on {this.props.book.ratingsCount} opinions)</p>)
          			  : (<p tabIndex='0'>There is no rating available for this book</p>)}
          			<div className="link"><a href={this.props.book.infoLink} tabIndex='0'>More info</a></div>
          			<div className="link"><a href={this.props.book.previewLink} tabIndex='0'>Preview</a></div>
          		</div>
            </div>
          </div>
        </div>
      )
	}
}

export default InfoBox
