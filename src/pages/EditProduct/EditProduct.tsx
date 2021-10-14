import { useCallback, useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import { editProduct, fetchProduct } from 'src/store/Products/Products.services';
import PageTitle from 'src/components/PageTitle/PageTitle';
import { Product, ProductsActionType } from 'src/store/Products/Products.types';
import { fetchCategorySelect } from 'src/store/Categories/Categories.services';
import { formatDataForSelect, translateErrorMessages } from 'src/utils/helpers';
import { useProducts } from 'src/hooks/useProducts';
import { SelectOption } from 'src/types/select.types';
import SelectAsync from 'src/components/SelectAsync/SelectAsync';
import { FormValidationError } from 'src/types/error.types';
import { FormFieldNames } from 'src/types/form.types';

type ParamsProps = {
    id: string;
};

const EditProduct = () => {
    const [productName, setProductName] = useState('');
    const [error, setError] = useState({ isError: false, errorMessage: '' });
    const [validationErrors, setValidationErrors] = useState<FormValidationError | undefined>();
    const [onSuccess, setOnSuccess] = useState(false);
    const [product, setProduct] = useState<Product>();
    const [selectedCategory, setSelectedCategory] = useState<SelectOption>();
    const {
        productsState: { loading },
        productsDispatch,
    } = useProducts();
    const { id } = useParams<ParamsProps>();
    const productId = +id;

    const getProduct = useCallback(async () => {
        try {
            productsDispatch({ type: ProductsActionType.SET_LOADING });
            const { data } = await fetchProduct(productId);
            const fetchedProduct: Product = data;

            setProductName(fetchedProduct.name);
            setProduct(fetchedProduct);
            setSelectedCategory(formatDataForSelect(fetchedProduct.category));
        } catch (err: any) {
            setError({ isError: true, errorMessage: err.message });
        } finally {
            productsDispatch({ type: ProductsActionType.SET_LOADING, payload: false });
        }
    }, [productId, productsDispatch]);

    const handleEditProduct = async (event: React.FormEvent) => {
        event.preventDefault();
        setOnSuccess(false);

        try {
            productsDispatch({ type: ProductsActionType.SET_LOADING });
            const updatedProduct = await editProduct({
                ...product!,
                name: productName,
                category_id: +selectedCategory?.value!,
            });

            productsDispatch({ type: ProductsActionType.UPDATE_PRODUCT, payload: updatedProduct });
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

    const handleNameInput = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setProductName(target.value);

    const validateField = (name: string) =>
        validationErrors?.errors.some((err: { field: string }) => err.field === name);
    const getError = (name: string) =>
        validationErrors?.errors.find((err: { field: string }) => err.field === name);

    useEffect(() => {
        getProduct();
    }, [getProduct]);

    return (
        <Container>
            <PageTitle>Edycja Produktu</PageTitle>
            <Row>
                <Col className="d-flex justify-content-center">
                    {loading ? (
                        <Spinner animation="border" />
                    ) : (
                        <Form
                            onSubmit={handleEditProduct}
                            className="d-flex flex-column"
                            style={{ width: 400 }}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nazwa produktu</Form.Label>
                                <Form.Control
                                    onChange={handleNameInput}
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
                                    setError={setError}
                                    selectedValue={selectedCategory}
                                    fetchValues={fetchCategorySelect}
                                    onChangeValue={setSelectedCategory}
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Zapisz
                            </Button>
                            {(onSuccess || error.isError) && (
                                <Alert
                                    className="mt-4 text-center"
                                    variant={onSuccess ? 'success' : 'danger'}>
                                    {onSuccess
                                        ? 'Pomyślnie zaktualizowano produkt'
                                        : error.errorMessage}
                                </Alert>
                            )}
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default EditProduct;
