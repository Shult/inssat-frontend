 
import { Container, Row, Col } from 'react-bootstrap';
import ArticleDetails from '../../_components/ArticleDetails';
 
import './Article.css'
import HorizontalCard from '../../_components/Cards/Horizontal';
import FeaturedUpdate from '../../_components/Cards/FeaturedUpdate';
 

import ArticleForm from '../../_components/Article/Create'


const CreateArticle = () => {


    
    return (
      <Container fluid className="w-100"> 
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={7} xl={8}>
        <ArticleForm /> 
        </Col>
        <Col xs={12} md={12} lg={5} xl={4}>
          
        </Col>
      </Row>
    </Container>
    )

 
}
export default CreateArticle
