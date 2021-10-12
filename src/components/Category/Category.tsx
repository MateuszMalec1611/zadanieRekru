import { ListGroup, Button } from 'react-bootstrap';

interface CategoryProps {
    name: string;
}

const Category: React.FC<CategoryProps> = ({ name }) => (
    <ListGroup.Item className="d-flex justify-content-between ">
        <h4 className="m-0 text-uppercase display-8">{name}</h4>
        <Button className="ms-3 text-uppercase" variant="dark">
            edit
        </Button>
    </ListGroup.Item>
);

export default Category;
