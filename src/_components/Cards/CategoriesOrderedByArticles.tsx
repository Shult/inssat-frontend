import { Card, Row, Col } from 'react-bootstrap';
import CategoryItem from './SimpleTextBothSide';

const CategoriesCard = ({ categories }: { categories: any[] }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title className="mb-3">Categories</Card.Title>
        <Row>
          <Col>
            {categories.map((category, index) => (
              <CategoryItem
                key={index}
                id = {category.id}
                title={category.title}
                articleCount={category.articleCount}
              />
            ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CategoriesCard;
