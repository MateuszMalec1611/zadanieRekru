import { ListGroup, Button } from 'react-bootstrap';
import { Category as CategoryType } from 'src/store/Categories/Categories.types';

interface CategoryProps {
    category: CategoryType;
}

const Category: React.FC<CategoryProps> = ({ category: { name } }) => (
    <ListGroup.Item className="d-flex justify-content-between align-items-center ">
        <h4 className="m-0 text-uppercase">{name}</h4>
        <Button className="ms-3 text-uppercase" variant="dark">
            edit
        </Button>
    </ListGroup.Item>
);

export default Category;
