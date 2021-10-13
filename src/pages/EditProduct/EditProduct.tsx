import { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import { editProduct, fetchProduct } from 'src/store/Products/Products.services';
import PageTitle from 'src/components/PageTitle/PageTitle';
import { useApp } from 'src/hooks/useApp';
import { AppActionType } from 'src/store/App/App.types';
import { Product, ProductsActionType } from 'src/store/Products/Products.types';
import AsyncSelect from 'react-select/async';
import { Category } from 'src/store/Categories/Categories.types';
import { fetchCategorySelect } from 'src/store/Categories/Categories.services';
import { useProducts } from 'src/hooks/useProducts';

type ParamsProps = {
    id: string;
};
type SelectedOption = { label: string; value: number };

const EditProduct = () => {
    const [productName, setProductName] = useState('');
    const [product, setProduct] = useState<Product>();
    const [selectedCategory, setSelectedCategory] = useState<SelectedOption>();
    const [success, setSuccess] = useState(false);
    const {
        appDispatch,
        appState: { loading },
    } = useApp();
    const { id } = useParams<ParamsProps>();
    const productId = +id;

    const getProduct = async () => {
        try {
            appDispatch({ type: AppActionType.LOADING, payload: true });

            const { data } = await fetchProduct(productId);
            const fetchedProduct: Product = data;

            setProductName(fetchedProduct.name);
            setProduct(fetchedProduct);
        } catch (err) {
            alert(err);
        } finally {
            appDispatch({ type: AppActionType.LOADING, payload: false });
        }
    };

    const searchCategories = async (searchValue: string) => {
        const { data } = await fetchCategorySelect(searchValue);
        const categories: Category[] = data;

        return categories.map(category => ({
            label: category.name,
            value: category.id,
        }));
    };

    const handleEditProduct = async (event: React.FormEvent) => {
        event.preventDefault();
        setSuccess(false);
        if (!selectedCategory?.value || productName.trim() === '') return;

        try {
            appDispatch({ type: AppActionType.LOADING, payload: true });
            const updatedProduct = {
                ...product!,
                category: {
                    ...product!.category!,
                    id: selectedCategory.value,
                    name: selectedCategory.label,
                },
                name: productName,
                category_id: selectedCategory.value,
                id: selectedCategory.value,
            };
            const status = await editProduct(updatedProduct, product!.id);

            appDispatch({ type: AppActionType.UPDATE_APP, payload: true });
            setSelectedCategory(undefined);
            setSuccess(true);
        } catch (err) {
            alert(err);
        } finally {
            appDispatch({ type: AppActionType.LOADING, payload: false });
        }
    };

    const handleNameInput = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setProductName(target.value);

    const handleCategoryChange = (selectedOptions?: SelectedOption | null) =>
        setSelectedCategory(selectedOptions!);

    useEffect(() => {
        getProduct();
    }, []);

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
                                <AsyncSelect
                                    cacheOptions
                                    defaultOptions
                                    loadOptions={searchCategories}
                                    onChange={handleCategoryChange}
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Zapisz
                            </Button>
                            {success && (
                                <Alert className="mt-4 text-center" variant="success">
                                    Pomyślnie zaktualizowany produkt
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
