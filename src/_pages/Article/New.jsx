import { Container, Row, Col } from 'react-bootstrap';
import './Article.css'
import ArticleForm from '../../_components/Article/Create'


const CreateArticle = () => {

    return (
        <Container fluid className="w-100">
            <Row className="justify-content-center">
                <Col xs={12} md={12} lg={12} xl={12}>
                    <ArticleForm />
                </Col>
                
            </Row>
        </Container>
    )

}
export default CreateArticle
