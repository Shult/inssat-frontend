import React, { useState, useEffect, useRef } from 'react';
import './ImageSelectorModal.css'; // Import the CSS file
import { Modal, Button, Spinner } from 'react-bootstrap';
import { getPublicFile, getFilesPaginated, uploadFile } from '../../_api/uploads';
import ImageList from './ImageList'; // Import your ImageList component
import { ActionButton } from '../ToolBox/Forms';

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
    if (show && fileNames.length > 0) {
      fetchAndDisplayImages();
    }
  }, [show, fileNames, pageNumber]);

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
        // Check if the file size is less than 1MB
        if (file.size <= 1024 * 1024) {
          const fileName = await uploadFile(file);
      
          // Update fileNames state
          setFileNames((prevFileNames) => [fileName, ...prevFileNames]);
      
          setImages((prevImages) => [{ imageName: fileName, imageBlob: file }, ...prevImages]);
        } else {
          alert("Merci de selectionner une photo < 1Mo");
        }
      } else {
        alert("Please select an image");
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
      <Modal.Body className="card-box text-center"> 
          <div>
            <label htmlFor="image_select" style={{cursor:"pointer"}}>
              <svg width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.09 122.88"><title>file-upload</title><path d="M64.64,13,86.77,36.21H64.64V13ZM42.58,71.67a3.25,3.25,0,0,1-4.92-4.25l9.42-10.91a3.26,3.26,0,0,1,4.59-.33,5.14,5.14,0,0,1,.4.41l9.3,10.28a3.24,3.24,0,0,1-4.81,4.35L52.8,67.07V82.52a3.26,3.26,0,1,1-6.52,0V67.38l-3.7,4.29ZM24.22,85.42a3.26,3.26,0,1,1,6.52,0v7.46H68.36V85.42a3.26,3.26,0,1,1,6.51,0V96.14a3.26,3.26,0,0,1-3.26,3.26H27.48a3.26,3.26,0,0,1-3.26-3.26V85.42ZM99.08,39.19c.15-.57-1.18-2.07-2.68-3.56L63.8,1.36A3.63,3.63,0,0,0,61,0H6.62A6.62,6.62,0,0,0,0,6.62V116.26a6.62,6.62,0,0,0,6.62,6.62H92.46a6.62,6.62,0,0,0,6.62-6.62V39.19Zm-7.4,4.42v71.87H7.4V7.37H57.25V39.9A3.71,3.71,0,0,0,61,43.61Z"/></svg>
            </label>
          </div>
          <div className='removeUpload'>
            <input id="image_select" ref={fileInputRef} type="file" accept="image/*" />
           
            <ActionButton active={!loading}  variant="primary" onClick={handleFileUpload}>
                
                {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Chargement...
            </>
          ) : (
            'Enregistrer'
          )}
             </ActionButton>
          </div>
        <ImageList setSelectedImage={setSelectedImage} fileNames={images} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      </Modal.Body>
      <Modal.Footer>
        <Button active={!loading} variant="secondary" onClick={handleFetchMore}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
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
