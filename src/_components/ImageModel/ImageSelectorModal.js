import React, { useState, useEffect, useRef } from 'react';
import './ImageSelectorModal.css'; // Import the CSS file
import { Modal, Button, Spinner } from 'react-bootstrap';
import { getPublicFile, getFilesPaginated, uploadFile } from '../../_api/uploads';
import ImageList from './ImageList'; // Import your ImageList component

const ImageSelectorModal = ({ show, handleClose, imageName, setSelectedImage }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [fileNames, setFileNames] = useState([]);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();

  useEffect(() => {
    const fetchFileNames = async () => {
      setLoading(true);

      try {
        // Fetch file names
        const newFileNames = await getFilesPaginated(pageNumber);
        if (newFileNames && newFileNames.length > 0) {
          setFileNames((prevFileNames) => {
            const uniqueFileNamesSet = new Set([...prevFileNames, ...newFileNames]);
            const uniqueFileNamesArray = Array.from(uniqueFileNamesSet);
            return uniqueFileNamesArray;
          });
        }
      } catch (error) {
        console.error('Error fetching file names:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFileNames();
  }, [pageNumber]);

  useEffect(() => {
    const fetchAndDisplayImages = async () => {
      setLoading(true);

      try {
        const _images = [];

        for (const imageName of fileNames) {
          try {
            const blobURL = await getPublicFile(imageName);
            _images.push({ imageName, imageBlob: blobURL });
          } catch (error) {
            console.error(`Error fetching image ${imageName}:`, error);
            // Handle the error, e.g., skip the image or add a placeholder
            _images.push({ imageName, imageBlob: null });
          }
        }

        setImages((prevImages) => [..._images]);
      } catch (error) {
        console.error('Error fetching and displaying images:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch images only when the component mounts or when the page number changes
    if (fileNames.length > 0) {
      fetchAndDisplayImages();
    }
  }, [fileNames, pageNumber]);

  const handleFetchMore = async () => {
    setLoading(true);

    try {
      const newPageNumber = pageNumber + 1;
      setPageNumber(newPageNumber);
      const newFileNames = await getFilesPaginated(newPageNumber);
      setFileNames((prevFileNames) => [...prevFileNames, ...newFileNames]);
    } catch (error) {
      console.error('Error fetching more files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async () => {
    setLoading(true);
  
    try {
      const fileInput = fileInputRef.current;
      const file = fileInput.files[0];
  
      if (file) {
        const fileName = await uploadFile(file);
  
        // Update fileNames state
        setFileNames((prevFileNames) => [fileName, ...prevFileNames]);
  
        
  
       // setImages((prevImages) => [{ imageName: fileName, imageBlob: file }, ...prevImages]);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <Modal size='xl' show={show} onHide={handleClose} className="bd-example-modal-lg w-100">
      <Modal.Header closeButton>
        <Modal.Title>Select {imageName} Image</Modal.Title>
      </Modal.Header>
      <Modal.Body className="card-box">
        <div>
          <input ref={fileInputRef} type="file" accept="image/*" />
          <Button variant="primary" onClick={handleFileUpload}>
            Upload
          </Button>
        </div>
        <ImageList setSelectedImage={setSelectedImage} fileNames={images} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      </Modal.Body>
      <Modal.Footer>
        <Button active={!loading} variant="secondary" onClick={handleFetchMore}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="mr-2" />
              Loading...
            </>
          ) : (
            'Fetch More'
          )}
        </Button>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageSelectorModal;
