import React, { useState } from 'react';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button } from 'react-bootstrap'; // Import Button from react-bootstrap
 
 const HeadingToolbar = ({ onToggleHeading }) => {
  const buttonStyle = {
    border: '1px solid var(--grey-dim)',
    color: 'var(--grey-dark)',
    padding: '5px',
    minWidth: '25px',
    minHeight: '20px',
    borderRadius: '2px',
    margin: '0px 4px',
    marginBottom: '20px',
    cursor: 'pointer',
    background: 'white',
    textTransform: 'capitalize',
  };

  return (
    <div>
      <Button
        style={buttonStyle}
        onClick={() => onToggleHeading('header-one')}
      >
        H1
      </Button>
      <Button
        style={buttonStyle}
        onClick={() => onToggleHeading('header-two')}
      >
        H2
      </Button>
    </div>
  );
};



export default HeadingToolbar