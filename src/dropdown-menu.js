//the component renders the dropdown menu 
import React, { Component } from 'react'
import './Search.css'
import * as Ionicons from '../node_modules/react-icons/io'
import * as BooksAPI from './BooksAPI.js'

class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showMenu: false,
			value: ''
		}
		this.handleShowMenu = this.handleShowMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.changeSelectedValue = this.changeSelectedValue.bind(this)
	}
	handleShowMenu(event) {
		this.setState({showMenu: true}, () => {
			document.addEventListener('click', this.closeMenu)
		})
	}
	closeMenu(event) {
		if(!this.dropDownMenu.contains(event.target)) {
			this.setState({showMenu: false}, () => {
				document.removeEventListener('click', this.closeMenu)
			})
		}
	}
	
	changeSelectedValue(event) {
		this.setState({shelf: event.target.value});
		console.log(this.state.shelf)
	}

	render() {
		return(
			<div className='dropdown-menu'>
				<button className='add-button' onClick={this.handleShowMenu}><Ionicons.IoIosAdd /></button>
				{this.state.showMenu && (
					<select className='menu' value={this.state.value} ref={(element) => {this.dropDownMenu = element}} onChange={this.changeSelectedValue}>
					<option value='moveTo' disabled>Move to...</option>
					<option value='currentlyReading'>Currently readings</option>
					<option value='wantToRead'>Want to read</option>
					<option value='read'>Read</option>
					<option value='none'>None</option>
					</select>
					) 			
				}
			</div>
		)
	}
}

export default Menu
