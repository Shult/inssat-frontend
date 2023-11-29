import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import {
    getCategories
} from '../../_api/category'

const Categories = (props) => {
    const [categories, setCategories] = useState([]); 
  
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
    };
 
  return (
    <Form.Group className="mb-3" controlId="categorySelect"> 
      <Form.Select 
        {...props} name="category" aria-label="Select category">
        {categories.map((category, index) => (
          <option key={index} value={category.id} >
            {category.title}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default Categories;
