import { useEffect } from 'react';
import { Alert, Col, Container, ListGroup, Row, Spinner } from 'react-bootstrap';
import { useProducts } from 'src/hooks/useProducts';
import PageTitle from 'src/components/PageTitle/PageTitle';
import Product from 'src/components/Product/Product';

interface ProductListProps {
    editOption?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ editOption }) => {
    const {
        productsState: {
            products,
            loading,
            error: { isError, errorMessage },
        },
        getProducts,
    } = useProducts();

    const productsList = products.map(product => (
        <Product key={product.uid} editOption={editOption} product={product} />
    ));

    useEffect(() => {
        if (!products.length) {
            getProducts();
        }
    }, [products, getProducts]);

    return (
        <Container>
            <PageTitle>Lista produktów</PageTitle>
            <Row>
                <Col className="d-flex flex-column align-items-center justify-content-center">
                    {loading && !isError ? (
                        <Spinner animation="border" />
                    ) : (
                        <ListGroup style={{ width: 500 }}>
                            {products.length === 0 && !isError ? (
                                <p className="text-center">Brak produktów</p>
                            ) : (
                                productsList
                            )}
                        </ListGroup>
                    )}
                    {isError && <Alert variant="danger">{errorMessage}</Alert>}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductList;
