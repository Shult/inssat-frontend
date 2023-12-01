import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { getCategories } from '../../_api/category';

const Categories = (props) => {
  const { selected, onChange } = props; // 'selected' contains the ID of the selected category
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
        {...props}
        name="category"
        aria-label="Select category"
        onChange={onChange} // Pass the onChange handler
        value={selected} // Set the selected value based on 'selected' prop
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default Categories;
