//This component render the main page with the three shelves
import React, { Component } from 'react'
import './App.css'
import Current from './Current.js'
import WantTo from './WantTo.js'
import Reads from './Reads.js'
import Search from './SearchApp.js'
import Add from './add.js'
import * as BooksAPI from './BooksAPI.js'
import { Route } from 'react-router-dom'


class App extends Component {
 
 render() {
    return (
      <div className="App">
        <Route exact path='/' render={()=> (
          <div className='main'>
            <header className="App-header">
              <h1 className="App-title">My Reads</h1>
            </header>
            <Add />
            <Current />
            <WantTo />
            <Reads />
          </div>
        )}/>
        <Route exact path='/Search' component={Search}/>
      </div>
    );
  }
};


export default App;
