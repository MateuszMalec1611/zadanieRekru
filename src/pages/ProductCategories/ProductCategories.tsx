import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import Category from 'src/components/Category/Category';
import PageTitle from 'src/components/PageTitle/PageTitle';
import { useCategories } from 'src/hooks/useCategories';

const ProductCategories = () => {
    const {
        categoriesState: { categories },
    } = useCategories();

    const categoriesList = categories.map(category => (
        <Category key={category.uid} category={category} />
    ));

    return (
        <Container>
            <PageTitle>Lista kategorii</PageTitle>
            <Row>
                <Col className="d-flex justify-content-center">
                    <ListGroup style={{ width: 500 }}>{categoriesList}</ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductCategories;
