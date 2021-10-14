import React, { useState } from 'react';
import { Col, Container, Form, Row, Button, Spinner, Alert } from 'react-bootstrap';
import Select from 'react-select';
import { useProducts } from 'src/hooks/useProducts';
import PageTitle from 'src/components/PageTitle/PageTitle';
import { fetchCategorySelect } from 'src/store/Categories/Categories.services';
import { addProduct, fetchTaxes } from 'src/store/Products/Products.services';
import { ProductsActionType } from 'src/store/Products/Products.types';
import { SelectedOption, SelectedOptionStrings } from 'src/types/select.types';
import { measureSelectOptions } from 'src/utils/constants';
import SelectAsync from 'src/components/SelectAsync/SelectAsync';
import { FormFieldNames } from 'src/types/form.types';
import { FormValidationError } from 'src/types/error.types';
import { translateErrorMessages } from 'src/utils/helpers';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [error, setError] = useState({ isError: false, errorMessage: '' });
    const [validationErrors, setValidationErrors] = useState<FormValidationError | undefined>();
    const [onSuccess, setOnSuccess] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<SelectedOption>();
    const [selectedTax, setSelectedTax] = useState<SelectedOption>();
    const [selectedMeasure, setSelectedMeasure] = useState<SelectedOptionStrings>();
    const {
        productsState: { loading },
        productsDispatch,
    } = useProducts();

    const handleAddProduct = async (event: React.FormEvent) => {
        setOnSuccess(false);
        event.preventDefault();

        try {
            productsDispatch({ type: ProductsActionType.SET_LOADING });
            const newProduct = await addProduct({
                name: productName,
                measure_type: selectedMeasure?.value,
                category_id: selectedCategory?.value,
                tax_id: selectedTax?.value,
                type: 'BASIC',
            });

            productsDispatch({ type: ProductsActionType.ADD_PRODUCT, payload: newProduct });

            setError({ isError: false, errorMessage: '' });
            setValidationErrors(undefined);
            setOnSuccess(true);
        } catch (err: any) {
            if (err.response?.status === 422) {
                return setValidationErrors(err.response?.data);
            }
            setError({ isError: true, errorMessage: err.message });
        } finally {
            productsDispatch({ type: ProductsActionType.SET_LOADING, payload: false });
        }
    };

    const handleProductNameInput = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setProductName(target.value);

    const handleMeasureChange = (selectedOption?: SelectedOptionStrings | null) =>
        setSelectedMeasure(selectedOption!);

    const validateField = (name: string) =>
        validationErrors?.errors.some((err: { field: string }) => err.field === name);
    const getError = (name: string) =>
        validationErrors?.errors.find((err: { field: string }) => err.field === name);

    return (
        <Container>
            <PageTitle>Dodaj Produkt</PageTitle>
            <Row>
                <Col className="d-flex justify-content-center">
                    {loading ? (
                        <Spinner animation="border" />
                    ) : (
                        <Form
                            onSubmit={handleAddProduct}
                            className="d-flex flex-column"
                            style={{ width: 400 }}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nazwa produktu</Form.Label>
                                <Form.Control
                                    onChange={handleProductNameInput}
                                    value={productName}
                                    type="text"
                                    placeholder="Wpisz nazwę produktu"
                                    isInvalid={validateField(FormFieldNames.NAME)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {translateErrorMessages(getError(FormFieldNames.NAME)?.code)}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nazwa kategorii</Form.Label>
                                <SelectAsync
                                    name={FormFieldNames.CATEGORY_ID}
                                    setError={setError}
                                    fetchValues={fetchCategorySelect}
                                    onChangeValue={setSelectedCategory}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Podatek zakupu</Form.Label>
                                <SelectAsync
                                    name={FormFieldNames.TAX_ID}
                                    setError={setError}
                                    fetchValues={fetchTaxes}
                                    onChangeValue={setSelectedTax}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Jednostka miary</Form.Label>
                                <Select
                                    name={FormFieldNames.MEASURE_TYPE}
                                    onChange={handleMeasureChange}
                                    options={measureSelectOptions}
                                    defaultValue={measureSelectOptions[0]}
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Zapisz
                            </Button>
                            {(onSuccess || error.isError) && (
                                <Alert
                                    className="mt-4 text-center"
                                    variant={onSuccess ? 'success' : 'danger'}>
                                    {onSuccess ? 'Pomyślnie dodano produkt' : error.errorMessage}
                                </Alert>
                            )}
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default AddProduct;
