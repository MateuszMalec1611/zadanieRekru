import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import PageTitle from 'src/components/PageTitle/PageTitle';
import Product from 'src/components/Product/Product';
import { useApp } from 'src/hooks/useApp';
import { useProducts } from 'src/hooks/useProducts';

interface ProductListProps {
    editOption?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ editOption }) => {
    const {
        appState: { loading },
    } = useApp();
    const {
        productsState: { products },
    } = useProducts();

    const productsList = products.map(product => (
        <Product key={product.uid} editOption={editOption} product={product} />
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
                            {products.length === 0 ? <p>Brak produktów</p> : productsList}
                        </ListGroup>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductList;
