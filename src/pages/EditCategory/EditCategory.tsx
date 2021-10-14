import { Alert, Col, Container, Form, Row, Spinner, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import PageTitle from 'src/components/PageTitle/PageTitle';
import { useCallback, useEffect, useState } from 'react';
import { CategoriesActionType, Category } from 'src/store/Categories/Categories.types';
import { editCategory, fetchCategory } from 'src/store/Categories/Categories.services';
import { useCategories } from 'src/hooks/useCategories';
import { useProducts } from 'src/hooks/useProducts';
import { ProductsActionType } from 'src/store/Products/Products.types';

type ParamsProps = {
    id: string;
};

const EditCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState({ isError: false, errorMessage: '' });
    const [onSuccess, setOnSuccess] = useState(false);
    const [category, setCategory] = useState<Category>();
    const { id } = useParams<ParamsProps>();
    const categoryId = +id;
    const {
        categoriesState: { loading },
        categoriesDispatch,
    } = useCategories();
    const { productsDispatch } = useProducts();

    const getCategory = useCallback(async () => {
        try {
            categoriesDispatch({ type: CategoriesActionType.SET_LOADING });
            const fetchedCategory = await fetchCategory(categoryId);
            
            setCategoryName(fetchedCategory.name);
            setCategory(fetchedCategory);
        } catch (err: any) {
            setError({ isError: true, errorMessage: err.message });
        } finally {
            categoriesDispatch({ type: CategoriesActionType.SET_LOADING, payload: false });
        }
    }, [categoriesDispatch, categoryId]);

    const handleEditCategory = async (event: React.FormEvent) => {
        event.preventDefault();
        setOnSuccess(false);
        if (categoryName.trim() === '') {
            setError({ isError: true, errorMessage: 'Nazwa musi być dłuższa niz jeden znak' });
            return;
        }
        if (!category) return;

        try {
            categoriesDispatch({ type: CategoriesActionType.SET_LOADING });
            const updatedCategory = await editCategory({
                ...category,
                name: categoryName,
            });

            categoriesDispatch({
                type: CategoriesActionType.UPDATE_CATEGORY,
                payload: updatedCategory,
            });
            productsDispatch({
                type: ProductsActionType.UPDATE_PRODUCT_CATEGORY,
                payload: updatedCategory,
            });
            setError({ isError: false, errorMessage: '' });
            setOnSuccess(true);
        } catch (err: any) {
            setError({ isError: true, errorMessage: err.message });
        }
    };

    const handleCategoryName = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setCategoryName(target.value);

    useEffect(() => {
        getCategory();
    }, [getCategory]);

    return (
        <Container>
            <PageTitle>Edycja Kategorii</PageTitle>
            <Row>
                <Col className="d-flex justify-content-center">
                    {loading ? (
                        <Spinner animation="border" />
                    ) : (
                        <Form
                            onSubmit={handleEditCategory}
                            className="d-flex flex-column"
                            style={{ width: 400 }}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nowa nazwa kategorii</Form.Label>
                                <Form.Control
                                    onChange={handleCategoryName}
                                    value={categoryName}
                                    type="text"
                                    placeholder="Wpisz nazwę kategorii"
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
                                        ? 'Pomyślnie zaktualizowano kategorie'
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

export default EditCategory;
