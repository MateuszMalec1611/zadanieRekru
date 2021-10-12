import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import PageTitle from 'src/components/PageTitle/PageTitle';

const AddProduct = () => {
    return (
        <Container>
            <PageTitle>Dodaj Produkt</PageTitle>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Form className="d-flex flex-column" style={{ width: 400 }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nazwa produktu</Form.Label>
                            <Form.Control type="text" placeholder="Wpisz nazwę produktu" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nazwa kategorii</Form.Label>
                            <Form.Control type="text" placeholder="Wpisz nazwę kategorii" />
                        </Form.Group>
                        <Button variant="dark" type="submit">
                            Zapisz
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddProduct;