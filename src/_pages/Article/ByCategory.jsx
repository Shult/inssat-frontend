import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { getArticlesByCategory } from '../../_api/article';

// Correct the import statement for HorizontalCard
import HorizontalCard from '../../_components/Cards/Horizontal';

const ByCategory = () => {
  const { id, name } = useParams();
  const [articles, setArticles] = useState([]);

  // Fetch articles by category
  const fetchArticlesByCategory = async () => {
    try {
      const response = await getArticlesByCategory(id);  
      if (response.ok) { 
        setArticles(response.data);
      } else {
        console.error('Failed to fetch articles');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    fetchArticlesByCategory(); 
  }, [id]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={7} xl={8}>
          <h2>{name}</h2>
          <Row>
            <Col>
              <div>
                {articles.map((article, index) => (
                  <HorizontalCard key={index} article={article} />
                ))}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ByCategory;
