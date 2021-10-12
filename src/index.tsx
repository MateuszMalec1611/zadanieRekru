import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './store/App/App.context';
import CategoriesProvider from './store/Categories/Categories.context';
import ProductsProvider from './store/Products/Products.context';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <CategoriesProvider>
                <ProductsProvider>
                    <AppProvider>
                        <App />
                    </AppProvider>
                </ProductsProvider>
            </CategoriesProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
