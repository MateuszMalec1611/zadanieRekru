import { useEffect } from 'react';
import { Alert, Col, Container, ListGroup, Row, Spinner } from 'react-bootstrap';
import { useProducts } from 'src/hooks/useProducts';
import PageTitle from 'src/components/PageTitle/PageTitle';
import Product from 'src/components/Product/Product';

const ProductList = () => {
    const {
        productsState: {
            products,
            loading,
            error: { isError, errorMessage },
        },
        getProducts,
    } = useProducts();

    const productsList = products.map(product => <Product key={product.uid} product={product} />);

    useEffect(() => {
        if (!products.length) {
            getProducts();
        }
    }, [products, getProducts]);

    return (
        <Container>
            <PageTitle>Lista produktów</PageTitle>
            <Row>
                <Col className="d-flex justify-content-center">
                    {loading && !isError && <Spinner animation="border" />}
                    {!loading && !isError && !!productsList.length && (
                        <ListGroup style={{ width: 500 }}>{productsList}</ListGroup>
                    )}
                    {!loading && !productsList.length && !isError && (
                        <p className="text-center">Brak produktów</p>
                    )}
                    {isError && <Alert variant="danger">{errorMessage}</Alert>}
                </Col>
            </Row>
        </Container>
    );
};
//

export default ProductList;
