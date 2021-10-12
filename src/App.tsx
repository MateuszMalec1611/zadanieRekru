import './App.css';
import { Route, Switch } from 'react-router-dom';
import NoMatch from './pages/NoMatch/NoMatch';
import Home from './pages/Home/Home';
import ProductsList from './pages/ProductsList/ProductsList';
import ProductCategories from './pages/ProductCategories/ProductCategories';
import EditProducts from './pages/EditProducts/EditProducts';
import EditCategories from './pages/EditCategories/EditCategories';
import Layout from './components/Layout/Layout';

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route component={Home} exact path="/" />
                <Route component={ProductsList} path="/products-list" />
                <Route component={ProductCategories} path="/product-categories" />
                <Route component={EditProducts} path="/edit-products" />
                <Route component={EditCategories} path="/edit-categories" />
                <Route path="/add-product-and-category" />
                <Route component={NoMatch} />
            </Switch>
        </Layout>
    );
};

export default App;
