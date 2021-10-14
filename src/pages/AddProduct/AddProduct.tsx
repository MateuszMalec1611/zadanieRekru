import React, { useState } from 'react';
import { Col, Container, Form, Row, Button, Spinner, Alert } from 'react-bootstrap';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { useProducts } from 'src/hooks/useProducts';
import PageTitle from 'src/components/PageTitle/PageTitle';
import { fetchCategorySelect } from 'src/store/Categories/Categories.services';
import { addProduct, fetchTaxes } from 'src/store/Products/Products.services';
import { ProductsActionType, ProductToAdd } from 'src/store/Products/Products.types';
import { SelectedOption, SelectedOptionStrings } from 'src/types/select.types';
import { formatDataForSelect } from 'src/utils/helpers';
import { taxSelectOptions } from 'src/utils/constants';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<SelectedOption>();
    const [selectedTax, setSelectedTax] = useState<SelectedOption>();
    const [selectedMeasure, setSelectedMeasure] = useState<SelectedOptionStrings>();
    const [success, setSuccess] = useState(false);
    const {
        productsState: { loading },
        productsDispatch,
    } = useProducts();

    const searchCategories = async (searchValue: string) => {
        const categories = await fetchCategorySelect(searchValue);

        return categories.map(category => formatDataForSelect(category));
    };

    const searchTaxes = async (searchValue: string) => {
        const taxes = await fetchTaxes(searchValue);

        return taxes.map(tax => formatDataForSelect(tax));
    };

    const handleAddProduct = async (event: React.FormEvent) => {
        setSuccess(false);
        event.preventDefault();
        if (
            !selectedCategory?.value ||
            productName.trim() === '' ||
            !selectedTax ||
            !selectedMeasure
        )
            return;

        try {
            productsDispatch({ type: ProductsActionType.SET_LOADING });
            const newProduct: ProductToAdd = {
                name: productName,
                measure_type: selectedMeasure.value,
                category_id: selectedCategory.value,
                tax_id: selectedTax.value,
                type: 'BASIC',
            };

            const product = await addProduct(newProduct);
            productsDispatch({ type: ProductsActionType.ADD_PRODUCT, payload: product });

            setSelectedCategory(undefined);
            setSuccess(true);
        } catch (err) {
            alert(err);
        }
    };

    const handleProductNameInput = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setProductName(target.value);

    const handleCategoryChange = (selectedOption?: SelectedOption | null) =>
        setSelectedCategory(selectedOption!);
    const handleTaxChange = (selectedOption?: SelectedOption | null) =>
        setSelectedTax(selectedOption!);
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
                                <AsyncSelect
                                    cacheOptions
                                    defaultOptions
                                    loadOptions={searchCategories}
                                    onChange={handleCategoryChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Podatek zakupu</Form.Label>
                                <AsyncSelect
                                    cacheOptions
                                    defaultOptions
                                    loadOptions={searchTaxes}
                                    onChange={handleTaxChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Jednostka miary</Form.Label>
                                <Select onChange={handleMeasureChange} options={taxSelectOptions} />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Zapisz
                            </Button>
                            {success && (
                                <Alert className="mt-4 text-center" variant="success">
                                    Pomyślnie dodano produkt
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
