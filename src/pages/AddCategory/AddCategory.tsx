import React, { useState } from 'react';
import { Col, Container, Form, Row, Button, Alert, Spinner } from 'react-bootstrap';
import PageTitle from 'src/components/PageTitle/PageTitle';
import { useCategories } from 'src/hooks/useCategories';
import { addCategory } from 'src/store/Categories/Categories.services';
import { CategoriesActionType } from 'src/store/Categories/Categories.types';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [onSuccess, setOnSuccess] = useState(false);

    const {
        categoriesDispatch,
        categoriesState: { loading },
    } = useCategories();

    const handleAddCategory = async (event: React.FormEvent) => {
        event.preventDefault();
        setOnSuccess(false);
        if (categoryName.trim() === '') return;

        try {
            categoriesDispatch({ type: CategoriesActionType.SET_LOADING });
            const newCategory = await addCategory({
                name: categoryName,
            });

            categoriesDispatch({ type: CategoriesActionType.ADD_CATEGORY, payload: newCategory });

            setOnSuccess(true);
        } catch (err) {
            alert(err);
        }
    };

    const handleCategoryName = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setCategoryName(target.value);

    return (
        <Container>
            <PageTitle>Dodaj kategorię</PageTitle>
            <Row>
                <Col className="d-flex justify-content-center">
                    {loading ? (
                        <Spinner animation="border" />
                    ) : (
                        <Form
                            onSubmit={handleAddCategory}
                            className="d-flex flex-column"
                            style={{ width: 400 }}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nazwa kategorii</Form.Label>
                                <Form.Control
                                    onChange={handleCategoryName}
                                    value={categoryName}
                                    type="text"
                                    placeholder="Wpisz nazwę kategorii"
                                />
                            </Form.Group>
                            <Button className="w-max-content" variant="dark" type="submit">
                                Zapisz
                            </Button>
                            {onSuccess && (
                                <Alert className="mt-4 text-center" variant="success">
                                    Pomyślnie dodano kategorie
                                </Alert>
                            )}
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default AddCategory;
