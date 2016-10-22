import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import './css/style.css';

// Components
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

// Router
const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern='/' component={ StorePicker } />
        <Match exactly pattern='/store/:storeId' component={ App } />
        <Miss component={ NotFound } />
      </div>
    </BrowserRouter>
  )
}

// Mounting Point
render(<Root/>, document.querySelector('#main'));
