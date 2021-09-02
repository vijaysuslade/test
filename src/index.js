import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import Popper from 'popper.js';

import { AuthContextProvider } from './store/auth-context';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
ReactDOM.render(
  <BrowserRouter >
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter >
  , document.getElementById('root')
);
