import React, { useState, useEffect } from 'react';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';
import './DraftEditor.css' 

import {
  Heading5
} from '../Headings'

const DraftEditor = ({ title, name, content, required }) => {
    const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty()
    );
    const [htmlContent, setHtmlContent] = useState(''); // State to hold HTML content
  
    useEffect(() => {
  
      const convertToHTML = () => {
        const contentState = editorState.getCurrentContent();
        const html = stateToHTML(contentState);
        setHtmlContent(html); // Update HTML content state
      };
   
      convertToHTML(); // Convert to HTML initially
    }, [editorState]); // Trigger when editorState changes

    useEffect(() => {
      if (content) {
        const blocksFromHTML = convertFromHTML(content);
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        setEditorState(EditorState.createWithContent(state));
      }
    }, [content]);

  
    const onEditorStateChange = (newEditorState) => {
      setEditorState(newEditorState);
    };
    const uploadImageCallBack = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({ data: { link: e.target.result } });
        };
        reader.onerror = (e) => {
          reject(e);
        };
        reader.readAsDataURL(file);
      });
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
            image: {
              uploadCallback: uploadImageCallBack,
              alt: { present: true, mandatory: false },
            },
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
