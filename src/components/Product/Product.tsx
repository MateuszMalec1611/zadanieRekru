import { ListGroup, Button } from 'react-bootstrap';

interface ProductProps {
    product: {
        name: string;
        category: string;
    };
}

const Product: React.FC<ProductProps> = ({ product: { name, category } }) => (
    <ListGroup.Item className="d-flex justify-content-between align-items-center ">
        <h4 className="m-0 text-uppercase">{name}</h4>
        <div className="d-flex align-items-center">
            <p className="m-0 text-uppercase display-7">{category}</p>
            <Button className="ms-3 text-uppercase" variant="dark">
                edit
            </Button>
        </div>
    </ListGroup.Item>
);

export default Product;
