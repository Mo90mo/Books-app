import React, { Component } from 'react';

class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showMenu: false,
		};
		this.dropDownMenu = this.dropDownMenu.bind(this);
		this.handleClick = this.handleClick.bind(this);	
	}
	//The function shows the menu
	dropDownMenu() {
    	this.setState(prevState => ({
      	showMenu: !prevState.showMenu
    	}));
  	}
  //The function calls the changeShelf function in the parent component and closes the menu
	handleClick(e) {
		this.props.changeShelf(e.target.getAttribute('value'), this);
		this.setState({showMenu: false})
	}
  
	render() {
		return(
			<div className='dropdown-menu' list="shelves-option">
        		<div className="container">
          			<div className="selection-button">
            			<button tabIndex='0' aria-haspopup='true' aria-expanded='false' role='menu' className='add-button' onClick={this.dropDownMenu}>Move the book to a shelf</button>
						<div className='select-box--arrow' onClick={this.dropDownMenu}>
							<span className={this.state.showMenu ? 'select-box--arrow-up' : 'select-box--arrow-down'}/>
						</div>
					</div>
					<div className='menu' style={{display: this.state.showMenu ? 'block' : 'none'}}>
						<option tabIndex='0' aria-selected={this.props.selectedShelf === 'currentlyReading' ? 'true' : 'false'} className={this.props.selectedShelf === 'currentlyReading' ? 'selected' : ''} onClick={this.handleClick} value={'currentlyReading'}>Currently reading</option>
						<option tabIndex='0' aria-selected={this.props.selectedShelf === 'wantToRead' ? 'true' : 'false'}  className={this.props.selectedShelf === 'wantToRead' ? 'selected' : ''} onClick={this.handleClick} value={'wantToRead'}>Want to read</option>
						<option tabIndex='0' aria-selected={this.props.selectedShelf === 'read' ? 'true' : 'false'}  className={this.props.selectedShelf === 'read' ? 'selected' : ''} onClick={this.handleClick} value={'read'}>Read</option>
						<option tabIndex='0' aria-selected={this.props.selectedShelf === 'none' ? 'true' : 'false'}  className={this.props.selectedShelf === 'none' ? 'selected' : ''} onClick={this.handleClick} value={'none'}>None</option>
					</div>	
				</div>	
      		</div>
    	)
	}
}

export default Menu
