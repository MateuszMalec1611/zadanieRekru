import './App.css';
import { Route, Switch } from 'react-router-dom';
import NoMatch from './pages/NoMatch/NoMatch';
import Home from './pages/Home/Home';
import ProductsList from './pages/ProductsList/ProductsList';
import ProductCategories from './pages/ProductCategories/ProductCategories';
import EditProduct from './pages/EditProduct/EditProduct';
import EditCategory from './pages/EditCategory/EditCategory';
import Layout from './components/Layout/Layout';

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route component={Home} exact path="/" />
                <Route component={ProductsList} path="/products-list" />
                <Route component={ProductCategories} path="/product-categories" />
                <Route component={EditProduct} path="/edit-product" />
                <Route component={EditCategory} path="/edit-category" />
                <Route path="/add-product-and-category" />
                <Route component={NoMatch} />
            </Switch>
        </Layout>
    );
};

export default App;
