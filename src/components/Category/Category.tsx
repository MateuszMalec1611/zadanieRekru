import { ListGroup, Button, Image } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Category as CategoryType } from 'src/store/Categories/Categories.types';
import editIco from 'src/img/edit.svg';

interface CategoryProps {
    category: CategoryType;
}

const Category: React.FC<CategoryProps> = ({ category: { name, id } }) => {
    const history = useHistory();

    const handleButton = () => history.push(`/edit-category/${id}`);

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center ">
            <h4 className="m-0 text-uppercase">{name}</h4>
            <Button onClick={handleButton} className="ms-3 text-uppercase" variant="dark">
            <Image className="me-2" src={editIco} />
            </Button>
        </ListGroup.Item>
    );
};

export default Category;
