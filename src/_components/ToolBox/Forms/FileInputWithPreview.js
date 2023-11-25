import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import './FileInputWithPreview.css'; 

function FileInputWithPreview({ onChange, id,  title, name }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleSelectedFile(file);
    }
  };

  const handleSelectedFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
    reader.readAsDataURL(file);
    onChange(file); // Passes the file to the parent component
  };

  const handleDelete = () => {
    setSelectedFile(null);
    onChange(null); // Informs parent component of file deletion
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleSelectedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="FileInputWithPreview position-relative mb-3">
      <label
        htmlFor={id}
        className="file-input-wrapper d-inline-block position-relative"
        style={{
          backgroundImage: selectedFile ? `url(${selectedFile})` : 'none',
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          id={id}
          type="file"
          accept="image/*"
          className="position-absolute overflow-hidden d-none"
          onChange={handleFileChange}
          name={name}
        />
        <div className="image-container">
          {!selectedFile && <span>{title}</span>}
          {selectedFile && (
            <button
              className="delete-button btn btn-danger rounded-circle"
              onClick={handleDelete}
            >
              <FaTrash />
            </button>
          )}
        </div>
      </label>
    </div>
  );
}

export default FileInputWithPreview;
