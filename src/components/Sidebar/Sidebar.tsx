import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Sidebar = () => {
    return (
        <>
            <Nav className="col-md-12 flex-column h-100 bg-dark" activeKey="/home">
                <LinkContainer to="/" className="border-bottom ">
                    <Nav.Link className="text-light">Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/products-list" className="border-bottom">
                    <Nav.Link className="text-light">Products List</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/product-categories" className="border-bottom">
                    <Nav.Link className="text-light">Product Categories</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/edit-products" className="border-bottom">
                    <Nav.Link className="text-light">Edit Products</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/edit-categories" className="border-bottom ">
                    <Nav.Link className="text-light">Edit Categories</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/add-product-and-category" className="border-bottom ">
                    <Nav.Link className="text-light">Add</Nav.Link>
                </LinkContainer>
            </Nav>
        </>
    );
};

export default Sidebar;
