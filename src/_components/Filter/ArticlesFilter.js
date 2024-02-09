 
import React, { useState, useEffect } from 'react';
import "./style.css"
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 
import { DateRangePicker } from 'react-date-range';

import {ActionButton} from '../ToolBox/Forms'

import { Form, Button, Col, Row, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import {getCategories} from '../../_api/category'
import {getTags} from '../../_api/tag' 
import { fr } from 'date-fns/locale'; 


const ArticlesFilter = ({ onFilter, loading }) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const categoriesData = await getCategories();
        const tagsData = await getTags();

        if(categoriesData.ok)
        setCategories(categoriesData.data);
        if(tagsData.ok)
        setTags(tagsData.data);
      } catch (error) {
        console.error('Error fetching categories and tags:', error);
      }
    };

    fetchCategoriesAndTags();
  }, []);

  const handleDateRangeChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleFilter = () => { 
    const filterOptions = {
      category: selectedCategory,
      tags: selectedTags,
      dateRange,
      search: searchTerm,
    };
    console.log(filterOptions)
    // Call the onFilter callback with the filter options
    onFilter(filterOptions);

 
  };

 
  const buttonStyles = {
    height: '35px',
    paddingTop: '4px',
    paddingBottom: '4px',
    fontSize: '16x',
    backgroundColor:'var(--gold)',
    border:'1px solid var(---grey-dim)'
  };

  return (
    <Form>
      <Row >
        <Col sm={12} md={7} lg={5}>
        <Form.Group controlId="dateRange" className="mb-3 d-flex justify-content-center">
            <DateRangePicker
              className='m-auto'
              ranges={dateRange}
              onChange={handleDateRangeChange}
              locale={fr}
              showPreview={false}
            />
            {/* {dateRange && (
              <Form.Text className="text-muted">
                Selected Date Range: {`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
              </Form.Text>
            )} */}
          </Form.Group>
        </Col>
        <Col sm={12} md={5} lg={7}> 
            <Row className="mb-3">
                <Form.Group className="px-2" controlId="category">
                    <label htmlFor='category'>Catégorie</label>
                    <Form.Control
                    as="select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                    <option value="">Toutes les catégories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                        {category.title}
                        </option>
                    ))}
                    </Form.Control>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group className="px-2" controlId="tags">
                    <label htmlFor='tags'>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>pour choisir plusieurs tags, il faut cliquer sur ctrl(windows) ou command(mac)</Tooltip>}
                        >
                            <span>Tags</span>
                        </OverlayTrigger>
                    </label>
                    <Form.Control 
                    as="select"
                    multiple
                    value={selectedTags}
                    onChange={(e) => setSelectedTags(Array.from(e.target.selectedOptions, (option) => option.value))}
                    >
                    {tags.map((tag) => (
                        <option key={tag.id} value={tag.id}
                        
                        >
                        {tag.title}
                        </option>
                    ))}
                    </Form.Control>
                </Form.Group>
            </Row>
       
            <Row className="mb-3">
                <Form.Group className="px-2" controlId="searchTerm">
                    <label htmlFor='searchTerm'>
                    
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>chercher un article par son titre ou contenu.</Tooltip>}
                        >
                            <span>Chercher</span>
                        </OverlayTrigger>
                    </label>
                    
                    <Form.Control 
                    type="text"
                    placeholder="Rechercher"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Form.Group>
            </Row>
            <Row  className="px-2 mb-3">


             <ActionButton active={!loading}  style={buttonStyles} onClick={handleFilter}>
                
                {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Filtration en cours...
            </>
          ) : (
            'Rechercher les articles'
          )}
             </ActionButton>
            </Row> 
        </Col>
      </Row>
    </Form>
  );
};

export default ArticlesFilter;
