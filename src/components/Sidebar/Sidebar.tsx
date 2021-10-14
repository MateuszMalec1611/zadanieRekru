import { Image, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import product from 'src/img/product.svg';
import category from 'src/img/category.svg';
import addProduct from 'src/img/addProduct.svg';
import addCategory from 'src/img/addCategory.svg';

const Sidebar = () => (
    <>
        <Nav className="col-md-12 flex-column h-100 bg-dark fs-5" activeKey="/home">
            <LinkContainer to="/" className="border-bottom ">
                <Nav.Link className="text-light ">
                    <div className="d-flex align-items-center">
                        <Image className="me-2" src={product} />
                        <p className="m-0 d-none d-md-block">Produkty</p>
                    </div>
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/product-categories" className="border-bottom">
                <Nav.Link className="text-light ">
                    <div className="d-flex align-items-center">
                        <Image className="me-2" src={category} />
                        <p className="m-0 d-none d-md-block">Kategorie</p>
                    </div>
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add-product" className="border-bottom ">
                <Nav.Link className="text-light ">
                    <div className="d-flex align-items-center">
                        <Image className="me-2" src={addProduct} />
                        <p className="m-0 d-none d-none d-md-block">Dodaj Produkt</p>
                    </div>
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add-category" className="border-bottom ">
                <Nav.Link className="text-light ">
                    <div className="d-flex align-items-center">
                        <Image className="me-2" src={addCategory} />
                        <p className="m-0 d-none d-md-block">Dodaj Kategorię</p>
                    </div>
                </Nav.Link>
            </LinkContainer>
        </Nav>
    </>
);

export default Sidebar;
