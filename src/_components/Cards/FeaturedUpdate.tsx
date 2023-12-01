import { Card, Row, Col, Image } from 'react-bootstrap';
import config from "../../config.json"

import {
    Heading2,
    Heading3,
} from '../ToolBox/Headings';
import {
    ParagraphStd,
} from '../ToolBox/Paragraphs';


const FeaturedUpdate = ({ article }:any) => {
    const { principal_image, thumbnail, title, description } = article


    const handleImageError = (event: any) => {
        event.target.src = config.development.API_URL+'/api_blog/uploads/default-thumbnail-featured.png';
    };

    return (
        <Card
            className="horizontal-card mb-3"
            style={{
                borderRadius: '8px',
                border: '0',
                background: 'var(--featured-gradient)',
                boxShadow: 'var(--box-shadow)',
                color: 'white', // Set the text color to white
            }}
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
                            <Image
                                onError={handleImageError}
                                src={config.development.API_URL+'/api_blog/uploads/'+principal_image}
                                className="img-fluid"
                                alt="Card"
                                style={{
                                    borderRadius: '8px',
                                    height:'176px',
                                    objectFit: 'cover',
                                    float: 'right', // Apply float to move the image to the right

                                }}

                            />
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

    );
};

export default FeaturedUpdate;
