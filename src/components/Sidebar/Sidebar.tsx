import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Sidebar = () => (
    <>
        <Nav className="col-md-12 flex-column h-100 bg-dark" activeKey="/home">
            <LinkContainer to="/" className="border-bottom">
                <Nav.Link className="text-light">Produkty</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/product-categories" className="border-bottom">
                <Nav.Link className="text-light">Kategorie</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add-product" className="border-bottom ">
                <Nav.Link className="text-light">Dodaj Produkt</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add-category" className="border-bottom ">
                <Nav.Link className="text-light">Dodaj Kategorię</Nav.Link>
            </LinkContainer>
        </Nav>
    </>
);

export default Sidebar;
