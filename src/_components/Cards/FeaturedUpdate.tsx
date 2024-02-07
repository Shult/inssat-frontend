import { Card, Row, Col, Image } from 'react-bootstrap';

import {
    Heading2,
    Heading3,
} from '../ToolBox/Headings';
import {
    ParagraphStd,
} from '../ToolBox/Paragraphs';
import { useEffect, useState } from 'react';

import {getDefaultFile, getPublicFile} from '../../_api/uploads'
import { useNavigate } from 'react-router-dom';

const FeaturedUpdate = ({ article }:any) => {
    const navigate = useNavigate();
    const { id, principal_image, title, description, author_id } = article

    const [principalImage, setPrincipalImage] = useState('');

  //================================================================================================

    useEffect(() => {
      const fetchPrincipalImage = async () => {
        try {
            console.log(principal_image)
            let img:string;
            if (principal_image === undefined || principal_image === null) {
                
                img = await getDefaultFile('default-thumbnail-featured.png');
            }else{
                img = (await getPublicFile(principal_image, author_id));
            }
              
          if(img)
          setPrincipalImage(img);
        } catch (error) {
          console.error('Error fetching principal image:', error);
        }
      };
  
      fetchPrincipalImage();
  
      return () => {
      };
    }, [principal_image]); 
  
  //================================================================================================

    const handleClick = ()=>{
        navigate('/article/'+id)
    }

  //================================================================================================
    return (
        <Card
            className="horizontal-card mb-3"
            style={{
                borderRadius: '8px',
                border: '0',
                background: 'var(--featured-gradient)',
                boxShadow: 'var(--box-shadow)',
                color: 'white', // Set the text color to white
                cursor: 'pointer'
            }}
            onClick={handleClick}
        >
            <Card.Body>
                <Row>
                    <Col  xs={12} lg={6}>
                        <Row className="title-row">
                            <Heading2
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    fontWeight: '300'
                                }}
                            >
                                Dernières publications
                            </Heading2>
                        </Row>
                        <Row className="mb-3 align-items-center">
                            <Heading3
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                {title}
                            </Heading3>
                            <ParagraphStd>
                                {description}
                            </ParagraphStd>
                        </Row>
                    </Col>
                    <Col xs={12} lg={6}>
                    <div className="image-container">
                    {principal_image && (
                        <Image
                        src={principalImage}
                        className="img-fluid mx-auto d-block d-sm-block w-100"
                        alt="Card"
                        style={{
                            borderRadius: '8px',
                            height: '176px',
                            objectFit: 'cover',
                        }}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/loading.gif'; 
                          }}
                        />
                    )}
                    </div>

                    </Col>
                </Row>
            </Card.Body>
        </Card>

    );
};

export default FeaturedUpdate;
