import { Container, Row, Col } from 'react-bootstrap';
import './Article.css'

import ArticleFormEdit from '../../_components/Article/Modify'

const CreateArticle = () => {

    return (
        <Container fluid className="w-100">
            <Row className="justify-content-center">
                <Col xs={12}>
                    <ArticleFormEdit />
                </Col>
            </Row>
        </Container>
    )

}
export default CreateArticle
