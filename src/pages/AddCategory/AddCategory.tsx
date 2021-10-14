import React, { useState } from 'react';
import { Col, Container, Form, Row, Button, Alert, Spinner } from 'react-bootstrap';
import PageTitle from 'src/components/PageTitle/PageTitle';
import { useCategories } from 'src/hooks/useCategories';
import { addCategory } from 'src/store/Categories/Categories.services';
import { CategoriesActionType } from 'src/store/Categories/Categories.types';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [onSuccess, setOnSuccess] = useState(false);
    const [error, setError] = useState({ isError: false, errorMessage: '' });
    const {
        categoriesDispatch,
        categoriesState: { loading },
    } = useCategories();

    const handleAddCategory = async (event: React.FormEvent) => {
        event.preventDefault();
        setOnSuccess(false);
        if (categoryName.trim() === '') {
            setError({ isError: true, errorMessage: 'Nazwa musi być dłuższa niz jeden znak' });
            return;
        }

        try {
            categoriesDispatch({ type: CategoriesActionType.SET_LOADING });
            const newCategory = await addCategory({
                name: categoryName,
            });

            categoriesDispatch({ type: CategoriesActionType.ADD_CATEGORY, payload: newCategory });

            setError({ isError: false, errorMessage: '' });
            setOnSuccess(true);
            setCategoryName('');
        } catch (err: any) {
            setError({ isError: true, errorMessage: err.message });
            categoriesDispatch({ type: CategoriesActionType.SET_LOADING, payload: false });
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
                            {(onSuccess || error.isError) && (
                                <Alert
                                    className="mt-4 text-center"
                                    variant={onSuccess ? 'success' : 'danger'}>
                                    {onSuccess ? 'Pomyślnie dodano kategorie' : error.errorMessage}
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
