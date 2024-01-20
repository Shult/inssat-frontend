 
import { Card, Form, Row, Col, Toast, Spinner } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import FileInputWithPreview from '../../_components/ToolBox/Forms/FileInputWithPreview';
import DraftEditor from '../ToolBox/Forms/DraftEditor';
import TagsInput from '../ToolBox/Forms/TagsInput';
import Categories from '../ToolBox/Categories';
import{Heading5} from '../../_components/ToolBox/Headings'
import { ActionButton } from '../ToolBox/Forms';

import { update, getArticleWithDetails } from '../../_api/article';
import { useParams } from 'react-router-dom'; 

import { useNavigate } from 'react-router-dom';
import ImageSelectorModal from '../ImageModel/ImageSelectorModal'
import { getPublicFile } from '../../_api/uploads';
 

function EditArticle(props) {
  const { id } = useParams();

  const formRef = useRef(null);
  const [article, setArticle] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [newArticlePath, setNewArticlePath] = useState(false);

  const [titleFocused, setTitleFocused] = useState(true);
  const [descriptionFocused, setDescriptionFocused] = useState(true);


  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------


  const [showFileManager, setShowFileManager] = useState(false);
  const [showFileManager2, setShowFileManager2] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState('');
  const [imageInvalid, setImageInvalid] = useState(false);
  const [imageInvalid2, setImageInvalid2] = useState(false);

  const [loading, setLoading] = useState(false);



  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------

  const navigate = useNavigate();

  const handleOpenFileManagerModal = (imageName) => {
    setSelectedImageName(imageName);
    setShowFileManager(true);
  };
  const handleOpenFileManagerModal2 = (imageName) => {
    setSelectedImageName(imageName);
    setShowFileManager2(true);
  };

  const handleClose = () => setShowFileManager(false);

  const handleImageSelect = (file) => {
    if(!file)
      return handleClose();


    setSelectedImage(file);
    setSelectedImageName(file.imageName);
    handleClose();
  };


  const handleClose2 = () => setShowFileManager2(false);

  const handleImageSelect2 = (file) => {
    if(!file)
      return handleClose();
    setSelectedImage2(file);
    setSelectedImageName(file.imageName);
    handleClose2();
  };



  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------


 
  const validate = (event)=>{
    setLoading(true);
    const form = formRef.current;
    if (form) {
        setImageInvalid(!selectedImage ? true:false)
        setImageInvalid2(!selectedImage2 ? true:false)
    
      if (form.checkValidity() && selectedImage && selectedImage2) { 

        if(selectedImage || selectedImage2)
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

    setTimeout(()=>{
      setLoading(false);
    }, 1000)

  }

  const handleSubmit = async (event) => {
    const form = formRef.current;
    if (form.checkValidity()) {
      console.log(document.querySelector('input[name="title"]').value)
      console.log(document.querySelector('textarea[name="Description"]').value)
      console.log(document.querySelector('textarea[name="content"]').value)
      console.log(document.querySelector('select[name="category"]').value)
      console.log(document.querySelector('input[name="tags"]').value.split('|'))
      

    const formData = new FormData();
    formData.append('title', document.querySelector('input[name="title"]').value);
    formData.append('description', document.querySelector('textarea[name="Description"]').value);
    formData.append('content',  document.querySelector('textarea[name="content"]').value);
    formData.append('category_id',  document.querySelector('select[name="category"]').value);

    formData.append('tags',  document.querySelector('input[name="tags"]').value);

   
    formData.append('thumbnail', selectedImage.imageName);
    formData.append('principal_image', selectedImage2.imageName); 


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
        navigate(articleLink);
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


  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------

useEffect(() => {

  const fetchArticleDetails = async () => {
    try {
      const response = await getArticleWithDetails(id);
      if (response.ok) {
        setArticle(response.data);
  
        // Fetch and set principal_image
        const principalImageBlobURL = await getPublicFile(response.data.principal_image);
        setSelectedImage2({
          imageName: response.data.principal_image,
          imageBlob: principalImageBlobURL,
        });
  
        // Fetch and set thumbnail
        const thumbnailBlobURL = await getPublicFile(response.data.thumbnail);
        setSelectedImage({
          imageName: response.data.thumbnail,
          imageBlob: thumbnailBlobURL,
        });
      } else {
        navigate('/page-not-found')
        // alert('Article was not found');
        console.error('Failed to fetch article details');
      }
    } catch (error) {
      console.error('Error fetching article details:', error);
    }
  };


  fetchArticleDetails();
}, [id, navigate]);


  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------


  fetchArticleDetails();
}, [id, navigate]);


  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------


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
            <FileInputWithPreview imageInvalid={imageInvalid} imageName={selectedImage && selectedImage.imageName} src={selectedImage && selectedImage.imageBlob} onClick={() => handleOpenFileManagerModal('miniature')} required id="thumbnail" name="thumbnail" title="selectionner miniature" />
            </Col>
            <Col xs={12}>
            <FileInputWithPreview  cadreStyle={{
              height:"250px",
            }} imageInvalid={imageInvalid2} imageName={selectedImage && selectedImage.imageName} src={selectedImage2 && selectedImage2.imageBlob} onClick={() => handleOpenFileManagerModal2('image principale')} required id="principal_image" name="principal_image" title="selectionner image principale" />
            </Col>

            <Col xs={12} lg={8}>
                  <DraftEditor  onChange={(e) => setArticle({ ...article, content: e.target.value })}
 content={article.content} name="content" title="Contenu" />
            </Col>

            <Col xs={12} lg={4}>
              <Row className="align-items-center justify-content-center h-100">
                <Col xs={12}>
                  <Heading5 >Etiquettes & Categories</Heading5>
                  <TagsInput tags={article.article_tags}/>
                  <Categories                     onChange={(e) => setArticle({ ...article, category: {...article, id:e.target.value} })}
 selected={article.category?.id} required/>
                </Col>

              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="d-flex justify-content-center">
             <ActionButton active={!loading}  variant="primary" onClick={validate}>
                
                {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Enregistrement...
            </>
          ) : (
            'Enregistrer'
          )}
             </ActionButton>
            </Col>
          </Row>
        </Form>)
        }

        <div className="position-fixed top-0 end-0 p-3">
        {/* Bootstrap Toast for showing validation errors */}
        <Toast show={showToast} onClose={() => setShowToast(false)} className="bg-danger text-white">
          <Toast.Header closeButton={true}>
            <strong className="me-auto">Erreur de validation</strong>
          </Toast.Header>
          <Toast.Body>Veuillez remplir les champs obligatoires.</Toast.Body>
        </Toast>
 
      </div>

      <ImageSelectorModal
        show={showFileManager}
        handleClose={handleClose}
        imageName={selectedImageName}
        setSelectedImage={handleImageSelect}
      />

      <ImageSelectorModal
        show={showFileManager2}
        handleClose={handleClose2}
        imageName={selectedImageName}
        setSelectedImage={handleImageSelect2}
      />
      </Card.Body>
    </Card>
  );
}

export default EditArticle;
