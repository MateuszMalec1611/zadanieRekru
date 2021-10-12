import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Sidebar = () => {
    return (
        <>
            <Nav
                className="col-md-12 flex-column h-100 bg-dark"
                activeKey="/home">
                <LinkContainer to="/" className="border-bottom ">
                    <Nav.Link className="text-light">Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/products-list" className="border-bottom">
                    <Nav.Link className="text-light">Products</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/product-categories" className="border-bottom">
                    <Nav.Link className="text-light">Categories</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/add-product" className="border-bottom ">
                    <Nav.Link className="text-light">Add Product</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/add-category" className="border-bottom ">
                    <Nav.Link className="text-light">Add Category</Nav.Link>
                </LinkContainer>
            </Nav>
        </>
    );
};

export default Sidebar;
