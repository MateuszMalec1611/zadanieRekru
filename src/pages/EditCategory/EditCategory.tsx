import { Alert, Col, Container, Form, Row, Spinner, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import PageTitle from 'src/components/PageTitle/PageTitle';
import { useApp } from 'src/hooks/useApp';
import { useEffect, useState } from 'react';
import { AppActionType } from 'src/store/App/App.types';
import { Category } from 'src/store/Categories/Categories.types';
import { editCategory, fetchCategory } from 'src/store/Categories/Categories.services';

type ParamsProps = {
    id: string;
};

const EditCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [category, setCategory] = useState<Category>();
    const [success, setSuccess] = useState(false);
    const {
        appDispatch,
        appState: { loading },
    } = useApp();
    const { id } = useParams<ParamsProps>();
    const categoryId = +id;

    const getCategory = async () => {
        try {
            appDispatch({ type: AppActionType.LOADING, payload: true });

            const { data } = await fetchCategory(categoryId);
            const fetchedCategory: Category = data;

            setCategoryName(fetchedCategory.name);
            setCategory(fetchedCategory);
        } catch (err) {
            alert(err);
        } finally {
            appDispatch({ type: AppActionType.LOADING, payload: false });
        }
    };

    const handleEditCategory = async (event: React.FormEvent) => {
        event.preventDefault();
        setSuccess(false);
        if (categoryName.trim() === '') return;

        try {
            appDispatch({ type: AppActionType.LOADING, payload: true });
            const updatedCategory: Category = { ...category!, name: categoryName };

            const status = await editCategory(updatedCategory, category!.id);
           
            // productsDispatch({ type: ProductsActionType.UPDATE_PRODUCTS, payload: true });
            setSuccess(true);
        } catch (err) {
            alert(err);
        } finally {
            appDispatch({ type: AppActionType.LOADING, payload: false });
        }
    };

    const handleCategoryName = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setCategoryName(target.value);

    useEffect(() => {
        getCategory();
    }, []);

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
                            {success && (
                                <Alert className="mt-4 text-center" variant="success">
                                    Pomyślnie zaktualizowana kategoria
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
