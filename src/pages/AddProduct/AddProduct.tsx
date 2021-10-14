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

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [error, setError] = useState({ isError: false, errorMessage: '' });
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
        if (
            !selectedCategory?.value ||
            productName.trim() === '' ||
            !selectedTax ||
            !selectedMeasure
        ) {
            setError({ isError: true, errorMessage: 'Wypełnij wszytskie pola' });
            return;
        }

        try {
            productsDispatch({ type: ProductsActionType.SET_LOADING });
            const newProduct = await addProduct({
                name: productName,
                measure_type: selectedMeasure.value,
                category_id: selectedCategory.value,
                tax_id: selectedTax.value,
                type: 'BASIC',
            });

            productsDispatch({ type: ProductsActionType.ADD_PRODUCT, payload: newProduct });

            setError({ isError: false, errorMessage: '' });
            setSelectedCategory(undefined);
            setOnSuccess(true);
        } catch (err: any) {
            setError({ isError: true, errorMessage: err.message });
        }
    };

    const handleProductNameInput = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setProductName(target.value);

    const handleMeasureChange = (selectedOption?: SelectedOptionStrings | null) =>
        setSelectedMeasure(selectedOption!);

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
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nazwa kategorii</Form.Label>
                                <SelectAsync
                                    setError={setError}
                                    fetchValues={fetchCategorySelect}
                                    onChangeValue={setSelectedCategory}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Podatek zakupu</Form.Label>
                                <SelectAsync
                                    setError={setError}
                                    fetchValues={fetchTaxes}
                                    onChangeValue={setSelectedTax}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Jednostka miary</Form.Label>
                                <Select
                                    onChange={handleMeasureChange}
                                    options={measureSelectOptions}
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
