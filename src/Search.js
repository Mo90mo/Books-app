import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import './App.css';
import App from './App';
import SearchApp from './SearchApp.js'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(<BrowserRouter><Search /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
