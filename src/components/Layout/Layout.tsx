import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';

const Layout: React.FC = ({ children }) => {
    return (
        <Container fluid className="vh-100">
            <Row>
                <Col xs={2} sm={4} md={5} lg={3} className="p-0 min-vh-100 nav">
                    <Sidebar />
                </Col>
                <Col className="flex-fill" xs={10} sm={8} md={8} lg={9}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};

export default Layout;
