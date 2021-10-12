import { useEffect } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import PageTitle from 'src/components/PageTitle/PageTitle';
import Product from 'src/components/Product/Product';
import { fetchProducts } from 'src/store/Products/Products.services';

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

    const getProducts = async () => {
        const { data } = await fetchProducts();
        console.log(data);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <Container>
            <PageTitle>Lista produktów</PageTitle>
            <Row>
                <Col className="d-flex justify-content-center">
                    <ListGroup style={{ width: 500 }}>{products}</ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductsList;
