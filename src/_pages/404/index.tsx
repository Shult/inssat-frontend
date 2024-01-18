import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

const _404 = () => {
  return (
    <Container fluid className="h-100 d-flex flex-column justify-content-center align-items-center">
      <Row className="justify-content-center ">
        <Col xs={12} md={12} lg={12} className="text-center">
          <div className="flex flex-1">
            <h1>404</h1>
            <p>Oops! La page que vous recherchez semble introuvable.</p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs={12}  className="text-center">
          <Link to="/">
                Retourner à la page d'accueil
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default _404;
