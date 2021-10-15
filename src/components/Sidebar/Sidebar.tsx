import { Image, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import productIco from 'src/img/product.svg';
import categoryIco from 'src/img/category.svg';
import addProductIco from 'src/img/addProduct.svg';
import addCategoryIco from 'src/img/addCategory.svg';

const Sidebar = () => (
    <>
        <Nav className="col-md-12 flex-column h-100 bg-dark fs-5" activeKey="/home">
            <LinkContainer to="/" className="border-bottom ">
                <Nav.Link className="text-light ">
                    <div className="d-flex align-items-center">
                        <Image className="me-2" src={productIco} />
                        <p className="m-0 d-none d-md-block nav-link-text">Produkty</p>
                    </div>
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/product-categories" className="border-bottom">
                <Nav.Link className="text-light ">
                    <div className="d-flex align-items-center">
                        <Image className="me-2" src={categoryIco} />
                        <p className="m-0 d-none d-md-block nav-link-text">Kategorie</p>
                    </div>
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add-product" className="border-bottom ">
                <Nav.Link className="text-light ">
                    <div className="d-flex align-items-center">
                        <Image className="me-2" src={addProductIco} />
                        <p className="m-0 d-none d-none d-md-block nav-link-text">Dodaj Produkt</p>
                    </div>
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add-category" className="border-bottom ">
                <Nav.Link className="text-light ">
                    <div className="d-flex align-items-center">
                        <Image className="me-2" src={addCategoryIco} />
                        <p className="m-0 d-none d-md-block nav-link-text">Dodaj Kategorię</p>
                    </div>
                </Nav.Link>
            </LinkContainer>
        </Nav>
    </>
);

export default Sidebar;
