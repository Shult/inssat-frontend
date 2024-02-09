import React from 'react';

const Tag = ({ text }: any) => {
  return (
    <button
      className="btn btn-sm m-1"
      style={{
        backgroundColor: 'var(--gold)',
        borderRadius: '999px', // Full rounded border radius
        color: 'white', // White text color
        border: 'none', // Remove the border
        paddingLeft: '15px',
        paddingRight: '15px',
      }}
    >
      {text}
    </button>
  );
};

export default Tag;
