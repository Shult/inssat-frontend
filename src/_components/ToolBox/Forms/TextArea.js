import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

const TextArea = () => {
  return (
    <FloatingLabel controlId="floatingTextarea" label="Enter text">
      <Form.Control
        as="textarea"
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
          resize: 'vertical',
        }}
        // Add other attributes or event handlers as needed
      />
    </FloatingLabel>
  );
};

export default TextArea;
