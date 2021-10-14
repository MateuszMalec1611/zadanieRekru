import { useEffect } from 'react';
import { Col, Container, ListGroup, Row, Spinner } from 'react-bootstrap';
import { useProducts } from 'src/hooks/useProducts';
import PageTitle from 'src/components/PageTitle/PageTitle';
import Product from 'src/components/Product/Product';

interface ProductListProps {
    editOption?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ editOption }) => {
    const {
        productsState: { products, loading },
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
                <Col className="d-flex justify-content-center">
                    {loading ? (
                        <Spinner animation="border" />
                    ) : (
                        <ListGroup style={{ width: 500 }}>
                            {products.length === 0 ? <p>Brak produktów</p> : productsList}
                        </ListGroup>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductList;
