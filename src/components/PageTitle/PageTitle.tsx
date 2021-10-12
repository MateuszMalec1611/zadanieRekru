import { Col, Row } from 'react-bootstrap';

const PageTitle: React.FC = ({ children }) => (
    <Row>
        <Col className="d-flex justify-content-center m-4">
            <h2 className="fs-1">{children}</h2>
        </Col>
    </Row>
);

export default PageTitle;
