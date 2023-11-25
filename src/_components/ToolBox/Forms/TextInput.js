import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

const InputText = () => {
  return (
    <FloatingLabel controlId="floatingInput" label="Enter text">
      <Form.Control
        type="text"
        placeholder="Enter text"
        style={{
          height: '37px',
          borderRadius: '8px',
          border: '1px solid var(--grey-dim)',
          background: 'white',
          fontSize: '14px',
          color: 'var(--grey-dim)',
          padding: '8px',
          boxSizing: 'border-box',
        }}
        // Add other attributes or event handlers as needed
      />
    </FloatingLabel>
  );
};

export default InputText;
