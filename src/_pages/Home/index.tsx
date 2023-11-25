import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getCategories } from '../../_api/category';
import { getLastSharedArticle, getArticlesWithDetails } from '../../_api/article';
import HorizontalCard from '../../_components/Cards/Horizontal';
import FeaturedUpdate from '../../_components/Cards/FeaturedUpdate';
import CalendarCustom from '../../_components/Calendar/CalendarCustom';

const Home = () => {
  const [categories, setCategories] = useState<any>([]);
  const [lastSharedArticle, setLastSharedArticle] = useState<any>({
    title: '',
    description: '',
    thumbnail: '',
  });
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const categoriesResponse = await getCategories();
      if (categoriesResponse.ok) {
        setCategories(categoriesResponse.data);
      } else {
        console.error('Error fetching categories:', categoriesResponse);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }

    try {
      const lastArticleResponse = await getLastSharedArticle();
      if (lastArticleResponse.ok) {
        setLastSharedArticle(lastArticleResponse.data);
      } else {
        console.error('Error fetching last shared article:', lastArticleResponse);
      }
    } catch (error) {
      console.error('Error fetching last shared article:', error);
    }

    try {
      const articlesResponse = await getArticlesWithDetails();
      if (articlesResponse.ok) {
        setArticles(articlesResponse.data);
      } else {
        console.error('Error fetching articles:', articlesResponse);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  return (
    <Container fluid className="w-100">
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={12}>
          <FeaturedUpdate article={lastSharedArticle} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={7} xl={8}>
          <CalendarCustom calendarType="timeGridDay" />
        </Col>
        <Col xs={12} md={12} lg={5} xl={4}>
          {articles.length > 0 &&
            articles.map((article, index) => (
              <HorizontalCard key={index} article={article} />
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
