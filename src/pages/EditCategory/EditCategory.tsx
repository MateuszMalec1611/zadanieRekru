import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import PageTitle from 'src/components/PageTitle/PageTitle';

type ParamsProps = {
    id: string;
};

const EditCategory = () => {
    const { id } = useParams<ParamsProps>();
    const categoryId = +id;

    return (
        <Container>
            <PageTitle>Edycja Kategorii</PageTitle>
        </Container>
    );
};

export default EditCategory;
