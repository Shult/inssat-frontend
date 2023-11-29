import { Card, Form, Row, Col, Button, Toast } from 'react-bootstrap';
import React, { useRef, useState } from 'react';
import FileInputWithPreview from '../../_components/ToolBox/Forms/FileInputWithPreview';
import DraftEditor from '../ToolBox/Forms/DraftEditor';
import TagsInput from '../ToolBox/Forms/TagsInput';
import Categories from '../ToolBox/Categories';
import{Heading5} from '../../_components/ToolBox/Headings'
import { ActionButton } from '../ToolBox/Forms';

import { createArticle } from '../../_api/article'; 
import { 
  getCategoryById
 } from '../../_api/category'; 


function CreateArticle() {
  const formRef = useRef(null);
  const [showToast, setShowToast] = useState(false);

  const [titleFocused, setTitleFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);

  const handleFileSubmit = (file) => { 
    setSelectedFile(file); 
  };
  const handleFile2Submit = (file) => { 
      setSelectedFile2(file); 
  };



  const validate = (event)=>{
    const form = formRef.current;
    if (form) {
      if (form.checkValidity()) {
        handleSubmit();
      } else {
        form.classList.add('was-validated');
        setShowToast(true); // Show the toast for validation errors
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        console.log('Form is invalid. Please fill in required fields.');
       }
    }
    
  }
  const handleSubmit = async (event) => {
   

    const form = formRef.current;
    if (form.checkValidity()) {
    // console.log(document.querySelector('input[name="title"]').value)
    // console.log(document.querySelector('textarea[name="Description"]').value)
    // console.log(document.querySelector('textarea[name="content"]').value)
    // console.log(document.querySelector('select[name="category"]').value)
    // console.log(document.querySelector('input[name="tags"]').value.split('|'))
    // console.log(selectedFile)
    // console.log(selectedFile2) 
    
    const formData = new FormData();
    formData.append('title', document.querySelector('input[name="title"]').value);
    formData.append('description', document.querySelector('textarea[name="Description"]').value);
    formData.append('content',  document.querySelector('textarea[name="content"]').value);  
    formData.append('category_id',  document.querySelector('select[name="category"]').value);  

    formData.append('tags',  document.querySelector('input[name="tags"]').value);  
  
    formData.append('images', selectedFile);
    formData.append('images', selectedFile2);
    formData.append('author_id', "94f8dce0-6032-4a98-bcf3-9dd46d0bd909");
     
    console.log('Form is valid. Ready to submit.');
    try {
      const response = await createArticle(formData);
  
      if (response.ok) {
        console.log('Article created successfully');
        // Handle success - maybe redirect, display a success message, etc.
      } else {
        console.error('Failed to create article:', response.problem);
        // Handle error display or other actions based on response.problem
      }
    } catch (error) {
      console.error('Error creating article:', error);
      // Handle unexpected errors, such as network issues, etc.
    } 
    
  } else {
    // Invalid form - show validation errors
    form.classList.add('was-validated');
    setShowToast(true); // Show the toast for validation errors
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
    console.log('Form is invalid. Please fill in required fields.');
  }
};




  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title className="mb-3">Create Article</Card.Title>
        <Form   ref={formRef} noValidate>
          <Row className="justify-content-center">
            <Col xs={12} lg={8}>
              <Form.Group className={`mb-3 ${titleFocused ? 'focused' : ''}`} controlId="title">
                <div className="form-group "> 
                  <Form.Label>Titre</Form.Label>
                  <Form.Control
                    name='title'
                    type="text"
                    placeholder=" "
                    onFocus={() => setTitleFocused(true)}
                    onBlur={(e) => {
                      if (!e.target.value) setTitleFocused(false);
                    }}
                    required
                  /> 
               </div>
              </Form.Group>
              <Form.Group className={`mb-3 ${descriptionFocused ? 'focused' : ''}`} controlId="description">
              <div className="form-group "> 
              <Form.Label>Description</Form.Label>
                <Form.Control
                  name='Description'
                  as="textarea"
                  rows={2}
                  onFocus={() => setDescriptionFocused(true)}
                  onBlur={(e) => {
                    if (!e.target.value) setDescriptionFocused(false);
                  }}
                  required
                />
                </div>
              </Form.Group> 
            </Col>

            <Col xs={12} lg={4}>
            <FileInputWithPreview required id="image1" name="images" title="selectionner miniature" onChange={handleFileSubmit}/>
            </Col>
            <Col xs={12}>
            <FileInputWithPreview required id="image2" name="images2" title="selectionner image principal" onChange={handleFile2Submit}/>
            </Col>

            <Col xs={12} lg={8}>
                  <DraftEditor name="content" title="Contenu" />
            </Col>

            <Col xs={12} lg={4}>
              <Row className="align-items-center justify-content-center h-100">
                <Col xs={12}>
                  <Heading5 >Tags & Categories</Heading5>
                  <TagsInput/>
                  <Categories required/>
                </Col>
                
              </Row>
            </Col> 
          </Row>
          <Row>
            <Col xs={12} className="d-flex justify-content-center">
             <ActionButton variant="primary" onClick={validate}>
                Enregistrer
             </ActionButton>
            </Col>
          </Row>
        </Form>
          

        <div className="position-fixed top-0 end-0 p-3">
        {/* Bootstrap Toast for showing validation errors */}
        <Toast show={showToast} onClose={() => setShowToast(false)} className="bg-danger text-white">
          <Toast.Header closeButton={true}>
            <strong className="me-auto">Validation Error</strong>
          </Toast.Header>
          <Toast.Body>Please fill in required fields.</Toast.Body>
        </Toast>
      </div>


      </Card.Body>
    </Card>
  );
}

export default CreateArticle;
