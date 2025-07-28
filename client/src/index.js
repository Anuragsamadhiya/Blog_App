import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'

// React Router
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <BrowserRouter>
      <App />
    </BrowserRouter>
 
);
