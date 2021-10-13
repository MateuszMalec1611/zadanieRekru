import { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { fetchProduct } from 'src/store/Products/Products.services';
import { fetchCategory } from 'src/store/Categories/Categories.services';
import PageTitle from 'src/components/PageTitle/PageTitle';
import { useApp } from 'src/hooks/useApp';
import { AppActionType } from 'src/store/App/App.types';
import { useProducts } from 'src/hooks/useProducts';

type ParamsProps = {
    id: string;
};

const EditProduct = () => {
    const [productName, setProductName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const {
        appDispatch,
        appState: { loading },
    } = useApp();
    const {
        productsState: { products },
    } = useProducts();
    const { id } = useParams<ParamsProps>();

    const getProduct = () => {
        products.forEach(product => {
            if (product.id === +id) {
                setProductName(product.name);
                // setCategoryName(product.category_name);
            }
        });
    };

    const handleNameInput = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setProductName(target.value);
    const handleCategoryInput = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setCategoryName(target.value);

    useEffect(() => {
        if (products.length !== 0) getProduct();
    }, [loading]);

    return (
        <Container>
            <PageTitle>Edycja Produktu</PageTitle>
            <Row>
                <Col className="d-flex justify-content-center">
                    {loading ? (
                        <p>loading</p>
                    ) : (
                        <Form className="d-flex flex-column" style={{ width: 400 }}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nazwa produktu</Form.Label>
                                <Form.Control
                                    onChange={handleNameInput}
                                    value={productName}
                                    type="text"
                                    placeholder="Wpisz nazwę produktu"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nazwa kategorii</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Zapisz
                            </Button>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default EditProduct;
