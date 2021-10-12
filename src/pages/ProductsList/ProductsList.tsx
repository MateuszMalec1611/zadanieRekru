import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import Product from 'src/components/Product/Product';

const DUMMY_DATA = [
    {
        name: 'schabowy',
        category: 'meat',
    },
    {
        name: 'cielęcina',
        category: 'meat',
    },
    {
        name: 'wołowina',
        category: 'meat',
    },
    {
        name: 'kurczak',
        category: 'meat',
    },
    {
        name: 'wieprzowina',
        category: 'meat',
    },
];

const ProductsList = () => {
    const products = DUMMY_DATA.map((p, i) => <Product key={i} product={p} />);

    return (
        <Container>
            <Row>
                <Col className="d-flex justify-content-center">
                    <h1 className="m-10">Lista Produktów</h1>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <ListGroup style={{ width: 500 }}>{products}</ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductsList;
