import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import './TagsInput.css';

const TagsInput = (props) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [tagsString, setTagsString] = useState('');
  const [tagFocused, setTagFocused] = useState(false);

  useEffect(() => {
    // Update the hidden input value whenever 'tags' change
    setTagsString(tags.join('|'));
  }, [tags]);

  useEffect(() => {
    // Set initial tags if props.tags exist
    if (props.tags) {
      setTags(props.tags);
      setTagsString(props.tags.join('|')); 
    }
  }, [props.tags]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (tagFocused && e.key === 'Enter') {
      e.preventDefault();
      const newTags = [...tags, inputValue];
      setTags(newTags);
      setInputValue('');
    }
  };

  const removeTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    setTagsString(newTags.join('|'));  
  };

  return (
    <Form.Group className={`mb-3 ${tagFocused ? 'focused' : ''}`} controlId="tag">
      <div className="form-group">
        <Form.Label>Enter tags...</Form.Label>
        <Form.Control
          {...props}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onFocus={() => setTagFocused(true)}
          onBlur={(e) => {
            if (!e.target.value) setTagFocused(false);
          }}
        />

        <div>
          {tags.map((tag, index) => (
            <span key={index} className="badge bg-primary me-2 mt-2">
              {tag}
              <button
                type="button"
                className="btn-close ms-2"
                onClick={() => removeTag(index)}
                aria-label="Close"
              ></button>
            </span>
          ))}
        </div>
        {/* Hidden input to hold tags string */}
        <input name="tags" type="hidden" value={tagsString} />
      </div>
    </Form.Group>
  );
};

export default TagsInput;
