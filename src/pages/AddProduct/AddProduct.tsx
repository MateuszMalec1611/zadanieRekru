import React, { useState } from 'react';
import { Col, Container, Form, Row, Button, Spinner, Alert } from 'react-bootstrap';
import Select from 'react-select';
import { useProducts } from 'src/hooks/useProducts';
import PageTitle from 'src/components/PageTitle/PageTitle';
import { fetchCategorySelect } from 'src/store/Categories/Categories.services';
import { addProduct, fetchTaxes } from 'src/store/Products/Products.services';
import { ProductsActionType } from 'src/store/Products/Products.types';
import { SelectOption } from 'src/types/select.types';
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
    const [selectedCategory, setSelectedCategory] = useState<SelectOption>();
    const [selectedTax, setSelectedTax] = useState<SelectOption>();
    const [selectedMeasure, setSelectedMeasure] = useState<SelectOption>();
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
                measure_type: selectedMeasure?.value.toString(),
                category_id: +selectedCategory?.value!,
                tax_id: +selectedTax?.value!,
                type: 'BASIC',
            });

            productsDispatch({ type: ProductsActionType.ADD_PRODUCT, payload: newProduct });

            setError({ isError: false, errorMessage: '' });
            setValidationErrors(undefined);
            setOnSuccess(true);
            setProductName('');
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

    const handleMeasureChange = (SelectOption?: SelectOption | null) =>
        setSelectedMeasure(SelectOption!);

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
                                />
                                {validateField(FormFieldNames.NAME) && (
                                    <p className="mb-0 mt-1 fs-6 text-danger">
                                        {translateErrorMessages(
                                            getError(FormFieldNames.NAME)?.code
                                        )}
                                    </p>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nazwa kategorii</Form.Label>
                                <SelectAsync
                                    name={FormFieldNames.CATEGORY_ID}
                                    setError={setError}
                                    fetchValues={fetchCategorySelect}
                                    onChangeValue={setSelectedCategory}
                                    selectedValue={selectedCategory}
                                />
                                {validateField(FormFieldNames.CATEGORY_ID) && (
                                    <p className="mb-0 mt-1 fs-6 text-danger">
                                        {translateErrorMessages(
                                            getError(FormFieldNames.CATEGORY_ID)?.code
                                        )}
                                    </p>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Podatek zakupu</Form.Label>
                                <SelectAsync
                                    name={FormFieldNames.TAX_ID}
                                    setError={setError}
                                    fetchValues={fetchTaxes}
                                    onChangeValue={setSelectedTax}
                                    selectedValue={selectedTax}
                                />
                                {validateField(FormFieldNames.TAX_ID) && (
                                    <p className="mb-0 mt-1 fs-6 text-danger">
                                        {translateErrorMessages(
                                            getError(FormFieldNames.TAX_ID)?.code
                                        )}
                                    </p>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Jednostka miary</Form.Label>
                                <Select
                                    name={FormFieldNames.MEASURE_TYPE}
                                    onChange={handleMeasureChange}
                                    options={measureSelectOptions}
                                    value={selectedMeasure}
                                />
                                {validateField(FormFieldNames.MEASURE_TYPE) && (
                                    <p className="mb-0 mt-1 fs-6 text-danger">
                                        {translateErrorMessages(
                                            getError(FormFieldNames.MEASURE_TYPE)?.code
                                        )}
                                    </p>
                                )}
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
