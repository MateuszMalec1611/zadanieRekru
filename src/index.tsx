import React from 'react';
import ReactDOM from 'react-dom';
import ProductsProvider from './store/Products/Products.context';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ProductsProvider>
                <App />
            </ProductsProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
