import { useCallback, useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import { editProduct, fetchProduct } from 'src/store/Products/Products.services';
import PageTitle from 'src/components/PageTitle/PageTitle';
import { Product, ProductsActionType } from 'src/store/Products/Products.types';
import { fetchCategorySelect } from 'src/store/Categories/Categories.services';
import { formatDataForSelect } from 'src/utils/helpers';
import { useProducts } from 'src/hooks/useProducts';
import { SelectedOption } from 'src/types/select.types';
import SelectAsync from 'src/components/SelectAsync/SelectAsync';

type ParamsProps = {
    id: string;
};

const EditProduct = () => {
    const [productName, setProductName] = useState('');
    const [error, setError] = useState({ isError: false, errorMessage: '' });
    const [onSuccess, setOnSuccess] = useState(false);
    const [product, setProduct] = useState<Product>();
    const [selectedCategory, setSelectedCategory] = useState<SelectedOption>();
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
        if (!product) return;
        if (!selectedCategory?.value || productName.trim() === '') {
            setError({ isError: true, errorMessage: 'Nazwa musi być dłuższa niz jeden znak' });
            return;
        }

        try {
            productsDispatch({ type: ProductsActionType.SET_LOADING });
            const updatedProduct = await editProduct({
                ...product,
                name: productName,
                category_id: selectedCategory.value,
            });

            productsDispatch({ type: ProductsActionType.UPDATE_PRODUCT, payload: updatedProduct });
            setError({ isError: false, errorMessage: '' });
            setOnSuccess(true);
        } catch (err: any) {
            setError({ isError: true, errorMessage: err.message });
        }
    };

    const handleNameInput = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setProductName(target.value);

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
                                />
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
