import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import CategoryItem from './SimpleTextBothSide'; // Import your CategoryItem component

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
