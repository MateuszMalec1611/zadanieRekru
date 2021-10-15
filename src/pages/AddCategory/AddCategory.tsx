import React, { useState } from 'react';
import { Col, Container, Form, Row, Button, Alert, Spinner } from 'react-bootstrap';
import PageTitle from 'src/components/PageTitle/PageTitle';
import { useCategories } from 'src/hooks/useCategories';
import { addCategory } from 'src/store/Categories/Categories.services';
import { CategoriesActionType } from 'src/store/Categories/Categories.types';
import { FormValidationError } from 'src/types/error.types';
import { FormFieldNames } from 'src/types/form.types';
import { translateErrorMessages } from 'src/utils/helpers';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [onSuccess, setOnSuccess] = useState(false);
    const [error, setError] = useState({ isError: false, errorMessage: '' });
    const [validationErrors, setValidationErrors] = useState<FormValidationError | undefined>();
    const {
        categoriesDispatch,
        categoriesState: { loading },
    } = useCategories();

    const handleAddCategory = async (event: React.FormEvent) => {
        event.preventDefault();
        setOnSuccess(false);

        try {
            categoriesDispatch({ type: CategoriesActionType.SET_LOADING });
            const newCategory = await addCategory({
                name: categoryName,
            });

            categoriesDispatch({ type: CategoriesActionType.ADD_CATEGORY, payload: newCategory });

            setError({ isError: false, errorMessage: '' });
            setValidationErrors(undefined);
            setOnSuccess(true);
            setCategoryName('');
        } catch (err: any) {
            if (err.response?.status === 422) {
                return setValidationErrors(err.response?.data);
            }
            setError({ isError: true, errorMessage: err.message });
        } finally {
            categoriesDispatch({ type: CategoriesActionType.SET_LOADING, payload: false });
        }
    };

    const handleCategoryName = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setCategoryName(target.value);

    const validateField = (name: string) =>
        validationErrors?.errors.some((err: { field: string }) => err.field === name);
    const getError = (name: string) =>
        validationErrors?.errors.find((err: { field: string }) => err.field === name);

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
                                {validateField(FormFieldNames.NAME) && (
                                    <p className="mb-0 mt-1 fs-6 text-danger">
                                        {translateErrorMessages(
                                            getError(FormFieldNames.NAME)?.code
                                        )}
                                    </p>
                                )}
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
