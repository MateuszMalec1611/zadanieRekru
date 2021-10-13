import { ListGroup, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Product as ProductType } from 'src/store/Products/Products.types';

interface ProductProps {
    product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product: { name, category, id } }) => {
    const history = useHistory();
    const categoryName = category.name;

    const handleButton = () => history.push(`/edit-product/${id}`);

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center ">
            <h4 className="m-0 text-uppercase">{name}</h4>
            <div className="d-flex align-items-center">
                <p className="m-0 text-uppercase display-7">{categoryName}</p>
                <Button onClick={handleButton} className="ms-3 text-uppercase" variant="dark">
                    edit
                </Button>
            </div>
        </ListGroup.Item>
    );
};

export default Product;
