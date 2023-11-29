import React, { useState, useEffect } from 'react';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';
import './DraftEditor.css' 

import {
  Heading5
} from '../Headings'

const DraftEditor = ({ title, name, required }) => {
    const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty()
    );
    const [htmlContent, setHtmlContent] = useState(''); // State to hold HTML content
  
    useEffect(() => {
      convertToHTML(); // Convert to HTML initially
    }, [editorState]); // Trigger when editorState changes
  
    const onEditorStateChange = (newEditorState) => {
      setEditorState(newEditorState);
    };
  
    const convertToHTML = () => {
      const contentState = editorState.getCurrentContent();
      const html = stateToHTML(contentState);
      setHtmlContent(html); // Update HTML content state
    };
 
  
    return (
      <div className="mt-4">
        <Heading5>{title}</Heading5>
        
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            options: ['blockType', 'inline', 'list'],
            list: { inDropdown: false, options: ['unordered', 'ordered'] },
            blockType: { inDropdown: false, options: ['Normal', 'H2',  'H3',  'H4', 'H5', 'Blockquote', 'Code','atomic','unstyled'] },
          }}
        /> 
       
        {/* Updated textarea to store HTML content */}
        <textarea
        name={name}
          style={{ display: 'none' }}
          value={htmlContent}
          readOnly
        />
      </div>
    );
  };
  
  export default DraftEditor;
