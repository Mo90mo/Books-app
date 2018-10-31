import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as Ionicons from '../node_modules/react-icons/io'


class Add extends Component {

	render() {
		return(
			<Link to='/Search' className='search-button'><Ionicons.IoIosSearch /></Link>
			)
	}
}

export default Add