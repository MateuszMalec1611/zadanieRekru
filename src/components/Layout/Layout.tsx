import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';

const Layout: React.FC = ({ children }) => {
    return (
        <Container fluid className="vh-100">
            <Row>
                <Col xs={2} className="p-0 min-vh-100 position-relative">
                    <Sidebar />
                </Col>
                <Col xs={10}>{children}</Col>
            </Row>
        </Container>
    );
};

export default Layout;
