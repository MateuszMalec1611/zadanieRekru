import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import PageTitle from 'src/components/PageTitle/PageTitle';
import Product from 'src/components/Product/Product';
import { useApp } from 'src/hooks/useApp';
import { useProducts } from 'src/hooks/useProducts';

const ProductList = () => {
    const {
        appState: { loading },
    } = useApp();
    const {
        productsState: { products },
    } = useProducts();

    const productsList = products.map(product => (
        <Product key={product.uid} product={product} />
    ));

    return (
        <Container>
            <PageTitle>Lista produktów</PageTitle>
            <Row>
                <Col className="d-flex justify-content-center">
                    {loading ? (
                        <p>loading</p>
                    ) : (
                        <ListGroup style={{ width: 500 }}>
                            {products.length === 0 ? (
                                <p>Brak produktów</p>
                            ) : (
                                productsList
                            )}
                        </ListGroup>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductList;