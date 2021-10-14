import { Route, Switch } from 'react-router-dom';
import NoMatch from './pages/NoMatch/NoMatch';
import Layout from './components/Layout/Layout';
import ProductList from './pages/ProductList/ProductList';
import ProductCategories from './pages/ProductCategories/ProductCategories';
import EditProduct from './pages/EditProduct/EditProduct';
import EditCategory from './pages/EditCategory/EditCategory';
import AddCategory from './pages/AddCategory/AddCategory';
import AddProduct from './pages/AddProduct/AddProduct';

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route component={ProductList} exact path="/" />
                <Route component={ProductCategories} path="/product-categories" />
                <Route component={EditProduct} path="/edit-product/:id" />
                <Route component={EditCategory} path="/edit-category/:id" />
                <Route component={AddProduct} path="/add-product" />
                <Route component={AddCategory} path="/add-category" />
                <Route component={NoMatch} />
            </Switch>
        </Layout>
    );
};

export default App;
