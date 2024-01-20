import React, { useState, useEffect } from 'react';
import "./index.css"
import { Container, Row, Col, Alert } from 'react-bootstrap';

import { getFilteredArticles } from '../../_api/article';
import ArticlesFilter from '../../_components/Filter/ArticlesFilter';
import HorizontalCard from '../../_components/Cards/Horizontal';

const AllWithFilter = () => {
  //zak--> front : you get the name/title of the page form the url for example filter name : filtrer vos articles ...  Hint==> { useParams } of 'react-router-dom'
  const name = "Filtre d'articles";
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(4); // TODO : Zak --> Front : you can add a select to the pagination to select number of elements per page. 
  const [filterOptions, setFilterOptions] = useState({
    category: '',
    tags: [],
    dateRange: { startDate: null, endDate: null },
    search: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const fetchFilteredArticles = async () => {
      try {
        const response = await getFilteredArticles({
          ...filterOptions,
          page: currentPage,
          pageSize,
        });

        if (response.ok) {
            console.log(response.data)
          setArticles(response.data.articles);
          setTotalPages(response.data.totalPages);
        } else {
          console.error('Failed to fetch articles');
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }

    setLoading(false)
    };

    fetchFilteredArticles();
  }, [filterOptions, currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFilterChange = (newFilterOptions) => {
    setFilterOptions(newFilterOptions);
    setCurrentPage(1);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12}>
          <h2>{name}</h2>
          <ArticlesFilter loading={loading} onFilter={handleFilterChange} />
          <hr/>
          <Row className="mt-5">
            {articles && articles.length === 0 ? (
              <Alert variant="info" className="mt-3">
                <p className="mb-0">Rien trouve</p>
              </Alert>
            ) : null}
            {articles && articles.map((article, index) => (
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
              <li className={`page-item ${articles && (currentPage === totalPages || articles.length === 0 ) ? 'disabled' : ''}`}>
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

export default AllWithFilter;
