import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { getArticlesByCategory } from '../../_api/article';
import HorizontalCard from '../../_components/Cards/Horizontal';

const ByCategory = () => {
  const { id, name } = useParams();
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(2); // Set the default pageSize to 10

  //================================================================================================

  useEffect(() => {
    const fetchArticlesByCategory = async () => {
      try {
        const response = await getArticlesByCategory(id, currentPage, pageSize); // Pass currentPage to API
        console.log(response)
        if (response.ok) {
          setArticles(response.data.articles);
          setTotalPages(response.data.totalPages);
        } else {
          console.error('Failed to fetch articles');
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticlesByCategory();
  }, [id, currentPage]);

  //================================================================================================

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  //================================================================================================

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12}>
          <h2>{name}</h2>
          <Row>
            {articles.map((article, index) => (
              <Col key={index} sm={12} md={12} lg={6} className="mb-4">
                <HorizontalCard article={article} />
              </Col>
            ))}
          </Row>
          <div className='d-flex justify-content-center mt-3'>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Precedent
                </button>
              </li>
              {[...Array(totalPages).keys()].map((page) => (
                <li
                  key={page + 1}
                  className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page + 1)}
                  >
                    {page + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Suivant
                </button>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ByCategory;
