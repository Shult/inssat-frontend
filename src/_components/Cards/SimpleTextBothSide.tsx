import React from 'react';
import { Link } from 'react-router-dom';

const CategoryItem = ({ title, articleCount }: any) => {
  return (
    <Link
      to={`/category/${title}`}
      className="btn btn-sm m-1 d-flex justify-content-between align-items-center"
      style={{
        backgroundColor: 'var(--gold)',
        borderRadius: '8px',
        color: 'white',
        border: 'none',
        paddingLeft: '15px',
        paddingRight: '15px',
        textDecoration: 'none', // Remove default link underline
      }}
    >
      <span>{title}</span>
      <span>{articleCount}</span>
    </Link>
  );
};

export default CategoryItem;
