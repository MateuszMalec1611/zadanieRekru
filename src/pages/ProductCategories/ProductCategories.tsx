import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import Category from 'src/components/Category/Category';
import PageTitle from 'src/components/PageTitle/PageTitle';

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
            <PageTitle>Lista kategorii</PageTitle>
            <Row>
                <Col className="d-flex justify-content-center">
                    <ListGroup style={{ width: 500 }}>{categories}</ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductCategories;
