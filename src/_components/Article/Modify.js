 
import { Card, Form, Row, Col, Button, Toast } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import FileInputWithPreview from '../../_components/ToolBox/Forms/FileInputWithPreview';
import DraftEditor from '../ToolBox/Forms/DraftEditor';
import TagsInput from '../ToolBox/Forms/TagsInput';
import Categories from '../ToolBox/Categories';
import{Heading5} from '../../_components/ToolBox/Headings'
import { ActionButton } from '../ToolBox/Forms';

import { update, getArticleWithDetails } from '../../_api/article';
import { useParams } from 'react-router-dom'; 

import {getImageAsBase64} from '../../_helpers/GetFileFromURL.function'


function EditArticle(props) {
  const { id } = useParams();

  const formRef = useRef(null);
  const [article, setArticle] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [newArticlePath, setNewArticlePath] = useState(false);

  const [titleFocused, setTitleFocused] = useState(true);
  const [descriptionFocused, setDescriptionFocused] = useState(true);

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
      console.log(document.querySelector('input[name="title"]').value)
      console.log(document.querySelector('textarea[name="Description"]').value)
      console.log(document.querySelector('textarea[name="content"]').value)
      console.log(document.querySelector('select[name="category"]').value)
      console.log(document.querySelector('input[name="tags"]').value.split('|'))
      console.log(selectedFile)
      console.log(selectedFile2)
      

    const formData = new FormData();
    formData.append('title', document.querySelector('input[name="title"]').value);
    formData.append('description', document.querySelector('textarea[name="Description"]').value);
    formData.append('content',  document.querySelector('textarea[name="content"]').value);
    formData.append('category_id',  document.querySelector('select[name="category"]').value);

    formData.append('tags',  document.querySelector('input[name="tags"]').value);

    formData.append('images', selectedFile);
    formData.append('images', selectedFile2);

    console.log('Form is valid. Ready to submit.');
   
    try {
      const response = await update(id, formData);
      
    
      if (response.ok) {
        console.log('Article updated successfully');
        setShowSuccessToast(true);
    
        // Assuming response.data.id contains the ID of the newly updated article
        const newArticleId = response.data.id;
        const articleLink = `/article/${newArticleId}`; // Adjust the route path as needed
        setNewArticlePath(articleLink)
    
        // Handle success - maybe redirect, display a success message, etc.
      } else {
        console.error('Failed to update article:', response.problem);
        // Handle error display or other actions based on response.problem
        setShowSuccessToast(false);
      }
    } catch (error) {
      console.error('Error creating article:', error);
      // Handle unexpected errors, such as network issues, etc.
    }

  } else {
    // Invalid form - show validation errors
    form.classList.add('was-validated');
    setShowToast(true); // Show the toast for validation errors
    setShowSuccessToast(false)
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
    console.log('Form is invalid. Please fill in required fields.');
  }
};



useEffect(() => {
  fetchArticleDetails();
}, []);

const fetchArticleDetails = async () => {
  try {
    const response = await getArticleWithDetails(id);
    if (response.ok) {
      setArticle(response.data);
      getImageAsBase64(response?.data?.thumbnail)
      .then((base64Data) => {
        // Handle the Base64 data here
        setSelectedFile(base64Data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });

      getImageAsBase64(response?.data?.principal_image)
      .then((base64Data) => {
        // Handle the Base64 data here
        setSelectedFile2(base64Data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
      
    } else {
      alert("article was found")
      console.error('Failed to fetch article details');
    }
  } catch (error) {
    console.error('Error fetching article details:', error);
  }
};


  return article && (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title className="mb-3">Create Article</Card.Title>
        
        {showSuccessToast ? ( <div className="d-flex align-items-center">
          <div className="me-3">
            
          </div>
          <div>
            <p style={{ marginBottom: '5px' }}>Article was updated!</p>
            <p style={{ color: '#BF9E4E', fontSize: '14px' }}>Your new article has been successfully updated.</p>
            <a href={newArticlePath}>click here to checkout</a>
          </div>
        </div>
        ) :
        (<Form ref={formRef} 

        noValidate>
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
                    value={article.title} 
                    onChange={(e) => setArticle({ ...article, title: e.target.value })}
                  />
               </div>
              </Form.Group>
              <Form.Group  className={`mb-3 ${descriptionFocused ? 'focused' : ''}`} controlId="description">
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
                   value={article.description}
                   onChange={(e) => setArticle({ ...article, description: e.target.value })}

                  required
                />
                </div>
              </Form.Group>
            </Col>

            <Col xs={12} lg={4}>
            <FileInputWithPreview image={selectedFile} required id="image1" name="images" title="selectionner miniature" onChange={handleFileSubmit}/>
            </Col>
            <Col xs={12}>
            <FileInputWithPreview image={selectedFile2}  required id="image2" name="images2" title="selectionner image principal" onChange={handleFile2Submit}/>
            </Col>

            <Col xs={12} lg={8}>
                  <DraftEditor  onChange={(e) => setArticle({ ...article, content: e.target.value })}
 content={article.content} name="content" title="Contenu" />
            </Col>

            <Col xs={12} lg={4}>
              <Row className="align-items-center justify-content-center h-100">
                <Col xs={12}>
                  <Heading5 >Tags & Categories</Heading5>
                  <TagsInput tags={article.article_tags}/>
                  <Categories                     onChange={(e) => setArticle({ ...article, category: {...article, id:e.target.value} })}
 selected={article.category?.id} required/>
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
        </Form>)
        }

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

export default EditArticle;
