import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';

const Layout: React.FC = ({ children }) => {
    return (
        <Container fluid className="vh-100">
            <Row>
                <Col xs={4} sm={4} md={3} lg={2} className="p-0 min-vh-100">
                    <Sidebar />
                </Col>
                <Col xs={8} sm={8} md={9} lg={10}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};

export default Layout;
