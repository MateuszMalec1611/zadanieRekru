import { ListGroup, Button } from 'react-bootstrap';
import { Product as ProductType } from 'src/store/Products/Products.types';

interface ProductProps {
    product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product: { name, category_name } }) => (
    <ListGroup.Item className="d-flex justify-content-between align-items-center ">
        <h4 className="m-0 text-uppercase">{name}</h4>
        <div className="d-flex align-items-center">
            <p className="m-0 text-uppercase display-7">{category_name}</p>
            <Button className="ms-3 text-uppercase" variant="dark">
                edit
            </Button>
        </div>
    </ListGroup.Item>
);

export default Product;
