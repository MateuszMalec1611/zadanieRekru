import { useEffect } from 'react';
import { Alert, Col, Container, ListGroup, Row, Spinner } from 'react-bootstrap';
import { useCategories } from 'src/hooks/useCategories';
import Category from 'src/components/Category/Category';
import PageTitle from 'src/components/PageTitle/PageTitle';

const ProductCategories = () => {
    const {
        categoriesState: {
            categories,
            loading,
            error: { isError, errorMessage },
        },
        getCategories,
    } = useCategories();

    const categoriesList = categories.map(category => (
        <Category key={category.uid} category={category} />
    ));

    useEffect(() => {
        if (!categories.length) {
            getCategories();
        }
    }, [categories, getCategories]);

    return (
        <Container>
            <PageTitle>Lista kategorii</PageTitle>
            <Row>
                <Col className="d-flex justify-content-center">
                    {loading && !isError && <Spinner animation="border" />}
                    {!loading && !isError && !!categoriesList.length && (
                        <ListGroup style={{ width: 500 }}>{categoriesList}</ListGroup>
                    )}
                    {isError && <Alert variant="danger">{errorMessage}</Alert>}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductCategories;
