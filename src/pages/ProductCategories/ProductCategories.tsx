import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import Category from 'src/components/Category/Category';

const DUMMY_DATA = [
    {
        name: 'mięso',
    },
    {
        name: 'pizza',
    },
    {
        name: 'warzywa',
    },
];

const ProductCategories = () => {
    const categories = DUMMY_DATA.map((p, i) => <Category key={i} name={p.name} />);

    return (
        <Container>
            <Row>
                <Col className="d-flex justify-content-center">
                    <h1 className="m-10">Lista Kategori</h1>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <ListGroup style={{ width: 500 }}>{categories}</ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductCategories;
