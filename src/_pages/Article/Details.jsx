import React, { useEffect, useState } from 'react';
import ArticleDetails from '../../_components/Article/ArticleDetails';

import './Article.css'

import { Container, Row, Col } from 'react-bootstrap';
import { getCategoriesByArticleCount } from '../../_api/category';
import HorizontalCard from '../../_components/Cards/Horizontal';

import CategoriesCard from '../../_components/Cards/CategoriesOrderedByArticles'

import {getArticleWithDetails, getArticlesWithDetails} from '../../_api/article'
import { useParams } from 'react-router-dom';

const Article = () => {
  // Access the parameters from the URL
  const { id } = useParams();

  const [categories, setCategories] = useState([{
    title:'',
    id:''
  }]);
  const [articles, setArticles] = useState([]);

  const [articleDetails, setArticleDetails] = useState([]);

  useEffect(() => {

    //------------_> getCategories
    const fetchData = async () => {
      try {
        const categoriesResponse = await getCategoriesByArticleCount();
        if (categoriesResponse.ok) {
          console.log(categoriesResponse.data)
          setCategories(categoriesResponse.data);
        } else {
          console.error('Error fetching categories:', categoriesResponse);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
  
      //------------_> getArticleById
      try {
        const articleResponse = await getArticleWithDetails(id);
        if (articleResponse.ok) {
          setArticleDetails(articleResponse.data);
          console.log(articleResponse.data)
        } else {
          console.error('Error fetching categories:', articleResponse);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
  
      //------------_> getArticlesWithDetails
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
    // Now 'id' contains the value from the URL
    console.log('Article ID:', id);
    fetchData();
  }, [id]);

  return (
      <Container fluid className="w-100">
        <Row className="justify-content-center">
          <Col xs={12} md={12} lg={7} xl={8}>
            <ArticleDetails article={articleDetails} />
          </Col>
          <Col xs={12} md={12} lg={5} xl={4}>
            <CategoriesCard  categories={categories} />
            {articles.length > 0 &&
                articles.map((article, index) => (
                    <HorizontalCard key={index} article={article} />
                ))}
          </Col>
        </Row>
      </Container>
  )


}
export default Article
