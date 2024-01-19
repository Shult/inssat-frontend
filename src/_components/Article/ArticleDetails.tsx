import { Card, Image, Row, Col, Modal } from 'react-bootstrap';
import { FaEye, FaComment } from 'react-icons/fa';
import Tag from '../ToolBox/Tag';
import { getTimeDifference } from '../../_helpers/DateTime.functions';
import { 
  Heading2, 
} from '../ToolBox/Headings';
import {
  ParagraphStd, 
} from '../ToolBox/Paragraphs';

// import {GetFileFromURL} from '../../_helpers/GetFileFromURL.function'
import { useEffect, useState } from 'react';
import { getDefaultFile, getPublicFile } from '../../_api/uploads';


 
const ArticleDetailsComponent = ({ article }: any) => {
  const {
    title,
    description,
    content,
    // thumbnail,
    principal_image,
    article_tags,
    like_count,
    comment_count,
    // category,
    author,
    published_at: publishedAt,
  } = article;


  
  const [showModal, setShowModal] = useState(false);
  //const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (imageName:any) => {
    //setSelectedImage(imageName);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


const ImageModal = ({ show, onHide, imageUrl }:any) => {
  return (
    <Modal size={'xl'} show={show} onHide={onHide} centered>
      <Modal.Body>
        <img src={imageUrl} alt="Full-size" style={{ width: '100%' }} />
      </Modal.Body>
    </Modal>
  );
};



  const [avatarImage, setAvatarImage] = useState('');
  const [principalImage, setPrincipalImage] = useState('');

  useEffect(() => {
    fetchPrincipalImage();
    fetchAvatarImage();

    // Specify the cleanup function to avoid potential memory leaks
    return () => {
    };
  }, []);

  useEffect(()=>{
    fetchPrincipalImage();
  }, [principal_image])


  const fetchAvatarImage = async () => {
    try {
        let _avatar:string;
       
        _avatar = await getDefaultFile('default-avatar.png');
        
      if(_avatar)
      setAvatarImage(_avatar);
    } catch (error) {
      console.error('Error fetching principal image:', error);
    }
  };
  

  const fetchPrincipalImage = async () => {
    try {
        console.log(principal_image)
        let img:string;
        if (principal_image === undefined || principal_image === null) {
            
            img = await getDefaultFile('default-thumbnail-featured.png');
        }else{
            img = (await getPublicFile(principal_image)).toString();
             
        }
          
      if(img)
      setPrincipalImage(img);
    } catch (error) {
      console.error('Error fetching principal image:', error);
    }
  };

  const views = 0;
  const comments = 0;

  // const handleImageError = (event: any) => {
  //   event.target.src = GetFileFromURL('default-thumbnail.png');  //http://localhost:5009/api_blog/uploads/
  // };

  const cardStyle = {
    padding:'10px',
    boxShadow: 'var(--box-shadow)',
    border: 0,
  };

  return (
    <Card className="mb-4" style={cardStyle}>
      <Card.Body>
        <Heading2>{title}</Heading2>
        <ParagraphStd>{description}</ParagraphStd>


          <div className="mb-3" dangerouslySetInnerHTML={{ __html: content }}></div>

          {principalImage &&  <Image srcSet={principalImage} fluid className="mb-4 w-100" 
                                style={{
                                  height: '400px',
                                  objectFit: 'cover',
                                  borderRadius: '8px'
                                }}
                                onClick={() => handleImageClick(principalImage)}
                             />
            }
            <ImageModal show={showModal} onHide={handleCloseModal} imageUrl={principalImage} />


        <div className="mb-2"> 
          {article_tags && article_tags.map((tag: any, index: any) => ( 
            <Tag key={index} text={tag}></Tag> 
          ))}

        </div>

        <Row className="mb-3 align-items-center">
          <Col className="d-flex align-items-center">
            <Image src={avatarImage} alt="Author Avatar" roundedCircle style={{ width: '64px', height: '64px' }} />
            <div className="ms-3">
              <p className="fw-bold mb-0">
              {author?.FIRST_NAME && author?.FIRST_NAME[0]}. {author?.LAST_NAME}

              </p>
              <p className="text-muted small mb-0">Posted {getTimeDifference(publishedAt)} ago</p>
            </div>
          </Col>
          <Col className="d-flex justify-content-end">
            <div className="d-flex align-items-center me-3">
              <FaEye className="me-1" /> {/* Eye icon */}
              <span>{like_count?like_count:views}</span> {/* Number of views */}
            </div>
            <div className="d-flex align-items-center">
              <FaComment className="me-1" /> {/* Comment icon */}
              <span>{comment_count}</span> {/* Number of comments */}
            </div>
          </Col>
        </Row>

      </Card.Body>
    </Card>
    
  );
};


export default ArticleDetailsComponent;
