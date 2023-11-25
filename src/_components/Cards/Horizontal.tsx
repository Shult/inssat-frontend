
import { Card, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Tag from '../ToolBox/Tag';

import {
  Heading6,
} from '../ToolBox/Headings';

import { getTimeDifference } from '../../_helpers/DateTime.functions';

import { GetFileFromURL } from '../../_helpers/GetFileFromURL.function';

const HorizontalCard = ({ article }: any) => {
  const { id, thumbnail, article_tags, title, author, published_at } = article;
  const avatar = GetFileFromURL('default-avatar.png');

  const handleImageError = (event: any) => {
    event.target.src = GetFileFromURL('default-thumbnail-horizontal.png');
  };

  return (
    <a href={`/article/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card className="horizontal-card mb-3" style={{ borderRadius: '8px', boxShadow: 'var(--box-shadow)' }}>
        <Card.Body>
        <Row>
          <Col xs={4}>
            <div className="image-container">
              <Image onError={handleImageError} src={GetFileFromURL(thumbnail)} className="img-fluid" alt="Card" style={{ borderRadius: '8px', 
                 height:'154px',
                objectFit: 'cover', }} />
            </div>
          </Col>
          <Col xs={8}>
            <Row className="tags-row">
            <div className="mb-3"> 
            {article_tags.slice(0, 2).map((tag: any, index: any) => ( 
              <Tag key={index} text={tag}></Tag> 
            ))}
 
        </div>

            </Row>
            <Row className="title-row">
              <Heading6 style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {title}
              </Heading6>
            </Row>
            <Row className="mb-3 align-items-center">
          <Col className="d-flex align-items-center">
            <Image src={avatar} alt="Author Avatar" roundedCircle style={{ width: '40px', height: '40px' }} />
            <div className="ms-3">
              <p className="fw-bold mb-0">
                {author.FIRST_NAME && author.FIRST_NAME[0]}. {author.LAST_NAME}
              </p> 
            </div>
            <div >
            <p className="m-0 ms-3 text-muted small">Posted {getTimeDifference(published_at)} ago</p>
            </div>
          </Col>
           
        </Row>

          </Col>
        </Row>
      </Card.Body>
      </Card>
    </a>
  );
};

export default HorizontalCard;