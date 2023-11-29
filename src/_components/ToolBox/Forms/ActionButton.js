import React from 'react';
import { Button } from 'react-bootstrap';

const CustomButton = ({ children, ...props }) => {
  const buttonStyles = {
    height: '27px',
    paddingTop: '4px',
    paddingBottom: '4px',
    fontSize: '12px',
    backgroundColor:'var(--gold)',
    border:'1px solid var(---grey-dim)'
  };

  return (
    <Button style={buttonStyles} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;