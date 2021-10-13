import { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { fetchProduct } from 'src/store/Products/Products.services';
import PageTitle from 'src/components/PageTitle/PageTitle';
import { useApp } from 'src/hooks/useApp';
import { AppActionType } from 'src/store/App/App.types';
import { Product } from 'src/store/Products/Products.types';
import AsyncSelect from 'react-select/async';
import { Category } from 'src/store/Categories/Categories.types';
import { fetchCategorySelect } from 'src/store/Categories/Categories.services';

type ParamsProps = {
    id: string;
};
type SelectedOption = { label: string; value: number };

const EditProduct = () => {
    const [productName, setProductName] = useState('');
    const [categoryId, setCategoryId] = useState<number>();
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
            const product: Product = data;

            setProductName(product.name);
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

    const handleNameInput = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setProductName(target.value);

    const handleCategoryChange = (selectedOptions?: SelectedOption | null) =>
        setCategoryId(selectedOptions!.value);

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <Container>
            <PageTitle>Edycja Produktu</PageTitle>
            <Row>
                <Col className="d-flex justify-content-center">
                    {loading ? (
                        <p>loading</p>
                    ) : (
                        <Form className="d-flex flex-column" style={{ width: 400 }}>
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
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default EditProduct;
