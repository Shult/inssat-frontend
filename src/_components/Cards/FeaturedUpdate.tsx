import { Card, Row, Col, Image } from 'react-bootstrap';

import {
    Heading2,
    Heading3,
} from '../ToolBox/Headings';
import {
    ParagraphStd,
} from '../ToolBox/Paragraphs';
import { useEffect, useState } from 'react';

import {getDefaultFile, getFile, getPublicFile} from '../../_api/uploads'

const FeaturedUpdate = ({ article }:any) => {
    const { principal_image, title, description } = article

    const [principalImage, setPrincipalImage] = useState('');

    useEffect(() => {
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
  
      fetchPrincipalImage();
  
      // Specify the cleanup function to avoid potential memory leaks
      return () => {
        // Cleanup logic if needed
      };
    }, []); // Empty dependency array means the effect runs once on mount
  


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
                                Latest Update
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
                            {principal_image && (<Image
                                src={principalImage}
                                className="img-fluid"
                                alt="Card"
                                style={{
                                    borderRadius: '8px',
                                    height:'176px',
                                    objectFit: 'cover',
                                    float: 'right', // Apply float to move the image to the right

                                }}

                            />)}
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

    );
};

export default FeaturedUpdate;
