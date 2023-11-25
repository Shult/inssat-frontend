import { Card, Image, Row, Col } from 'react-bootstrap';
import { FaEye, FaComment } from 'react-icons/fa';
import Tag from '../ToolBox/Tag';
import { getTimeDifference } from '../../_helpers/DateTime.functions';
import { 
  Heading2, 
} from '../ToolBox/Headings';
import {
  ParagraphStd, 
} from '../ToolBox/Paragraphs';

import {GetFileFromURL} from '../../_helpers/GetFileFromURL.function'



const ArticleDetailsComponent = ({ article }: any) => {
  const {
    title,
    description,
    content,
    thumbnail,
    principal_image,
    article_tags,
    category,
    author,
    published_at: publishedAt,
  } = article;



  const avatar = GetFileFromURL('default-avatar.png'); 
  const views = 0;
  const comments = 0;

  const handleImageError = (event: any) => {
    event.target.src = GetFileFromURL('default-thumbnail.png');  //http://localhost:5009/api_blog/uploads/
  };

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

        {/* Display other details */}
        <Image src={GetFileFromURL(principal_image)} onError={handleImageError} fluid className="mb-4 w-100" style={{
          height: '400px',
          objectFit: 'cover',
          borderRadius: '8px'
        }} />
 

          <div className="mb-3" dangerouslySetInnerHTML={{ __html: content }}></div>

        

        <div className="mb-3"> 
            {article_tags && article_tags.map((tag: any, index: any) => ( 
                <Tag text={tag}></Tag> 
            ))}

        </div>

        <Row className="mb-3 align-items-center">
          <Col className="d-flex align-items-center">
            <Image src={avatar} alt="Author Avatar" roundedCircle style={{ width: '64px', height: '64px' }} />
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
              <span>{views}</span> {/* Number of views */}
            </div>
            <div className="d-flex align-items-center">
              <FaComment className="me-1" /> {/* Comment icon */}
              <span>{comments}</span> {/* Number of comments */}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ArticleDetailsComponent;
