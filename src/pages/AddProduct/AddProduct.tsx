import { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import PageTitle from 'src/components/PageTitle/PageTitle';
import AsyncSelect from 'react-select/async';
import { fetchCategorySelect } from 'src/store/Categories/Categories.services';
import { Category } from 'src/store/Categories/Categories.types';
import { useApp } from 'src/hooks/useApp';
import { AppActionType } from 'src/store/App/App.types';
import { addProduct } from 'src/store/Products/Products.services';
import { Product } from 'src/store/Products/Products.types';

type SelectedOption = { label: string; value: number };

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<SelectedOption>();
    const [success, setSuccess] = useState(false);
    const {
        appDispatch,
        appState: { loading },
    } = useApp();

    const searchCategories = async (searchValue: string) => {
        const { data } = await fetchCategorySelect(searchValue);
        const categories: Category[] = data;

        return categories.map(category => ({
            label: category.name,
            value: category.id,
        }));
    };

    const handleAddProduct = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedCategory?.value || productName.trim() === '') return;

        try {
            appDispatch({ type: AppActionType.LOADING, payload: true });
            const newProduct: any = {
                category: null,
                category_id: 4,
                components: [],
                connections: [],
                critical_amount_level: '',
                custom_fields: [],
                custom_ids: [],
                default_price_net_money: { amount: '1', currency: 'PLN' },
                default_volume: null,
                image: null,
                measure_type: 'KILOGRAM',
                name: 'test312',
                product_components_empty: false,
                recipe_amount: '1',
                remove: false,
                sale_price_net_money: { amount: '', currency: 'PLN' },
                sku: '11',
                tax: {
                    id: '2',
                    name: '23%',
                    code: 'A',
                    amount: 23,
                    lastEditDate: null,
                    deleted: false,
                },
                tax_id: 2,
                type: 'BASIC',
                updated_at: null,
            };

            const status = await addProduct(newProduct);
            console.log(status);

            appDispatch({ type: AppActionType.UPDATE_APP, payload: true });
            setSelectedCategory(undefined);
            setSuccess(true);
        } catch (err) {
            alert(err);
        } finally {
            appDispatch({ type: AppActionType.LOADING, payload: false });
        }
    };

    const handleProductNameInput = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setProductName(target.value);
    const handleCategoryChange = (selectedOptions?: SelectedOption | null) =>
        setSelectedCategory(selectedOptions!);

    return (
        <Container>
            <PageTitle>Dodaj Produkt</PageTitle>
            <Row>
                <Col className="d-flex justify-content-center">
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
                        <Button variant="dark" type="submit">
                            Zapisz
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddProduct;
