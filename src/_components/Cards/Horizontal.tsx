import { Card, Row, Col,  Image  } from 'react-bootstrap';
import Tag from '../ToolBox/Tag';

import {
  Heading6,
} from '../ToolBox/Headings';

import { getTimeDifference } from '../../_helpers/DateTime.functions';

// import { GetFileFromURL } from '../../_helpers/GetFileFromURL.function';
import { getDefaultFile, getPublicFile } from '../../_api/uploads';
import {extractFirstImageLink} from "../Article/Services/articleServices";
import { useState, useEffect } from 'react';


import { useNavigate } from 'react-router-dom';

  //================================================================================================
  //================================================================================================
  //================================================================================================

const HorizontalCard = ({ article }: any) => {
  const navigate = useNavigate();
  const { id, thumbnail, article_tags, title, author, published_at, author_id } = article;
  //TODO : Zak - all default files should be fetched once in the parent component to avoid fetching the same file n times "n articles"
  const [thumbnailImage, setThumbnailImage] = useState('');

  const [avatarImage, setAvatarImage] = useState('');

  const [avatarEnssatImage, setAvatarEnssatImage] = useState('');

  //================================================================================================

  useEffect(() => {
    type ImageSetterFunction = React.Dispatch<React.SetStateAction<string>>;

    const fetchImage = async (
      setImageFunction: ImageSetterFunction,
      fileName: string | null | undefined,
      fallbackFileName: string
      ) => {
      try {
          let img;

          if (!fileName) {
              img = await getDefaultFile(fallbackFileName);
          } else {
              img = (await getPublicFile(fileName, author_id)).toString();
          }

          if (img) {
              setImageFunction(img);
          }
      } catch (error) {
          console.error(`Error fetching ${fallbackFileName} image:`, error);
      }
  };

    if(!article?.fromEnssat)
    fetchImage(setThumbnailImage, thumbnail, 'default-thumbnail-horizontal.png');
    fetchImage(setAvatarImage, null, 'default-avatar.png');
    fetchImage(setAvatarEnssatImage, null, 'default-enssat-avatar.png');

    
    // Specify the cleanup function to avoid potential memory leaks
    return () => {
      // Cleanup logic if needed
    };
  }, [article, thumbnail]); //to avoid eslint warning i added thumbnail  ==> article is sufficient 

  //================================================================================================

  

 

  //================================================================================================
  const fitImageStyles = {};

  // condition
  if(article.author_id === "Unknown"){
    article.author.FIRST_NAME = "Blog"
    article.author.LAST_NAME = "ENSSAT"
  }

  //================================================================================================
  return (
    <div
      role="button"
      tabIndex={0}
      style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
      onClick={() => {
        if (article?.fromEnssat) {
          window.open(article.link, '_blank');
        } else {
          navigate(`/article/${id}`);
        }
      }}
    >
      <Card className="horizontal-card mb-3" style={{ borderRadius: '8px', boxShadow: 'var(--box-shadow)' }}>
        <Card.Body>
          <Row>
            {/* Image on top for small screens */}
            <Col xs={12} className="d-md-none">
              <div className="image-container d-flex justify-content-center align-items-center">
                {article?.fromEnssat ? (
                  <Image
                    srcSet={extractFirstImageLink(article.thumbnail)}
                    className="img-fluid"
                    alt="Card"
                    style={{
                      borderRadius: '8px',
                      maxHeight: '130px',
                      minHeight: '130px',
                      objectFit: 'cover',
                      cursor: 'progress',
                      ...fitImageStyles,
                    }}
                  />
                ) : (
                  thumbnailImage ? 
                    <Image
                      src={thumbnailImage}
                      className="img-fluid"
                      alt="Card"
                      style={{
                        borderRadius: '8px',
                        maxHeight: '130px',
                        minHeight: '130px',
                        objectFit: 'cover',
                        ...fitImageStyles,
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/loading.gif'; 
                      }}
                    />
                    : 
                    <Image src='/loading.gif' roundedCircle style={{ width: '40px', height: '40px', transform: 'scale(2)'}} />
                )}
              </div>
            </Col>
            {/* Image on the left for larger screens */}
            <Col xs={12} md={4} className="order-md-1 mb-1">
              <div className="image-container d-flex justify-content-center align-items-center d-md-flex d-none">
                {article?.fromEnssat ? (
                  <Image
                    srcSet={extractFirstImageLink(article.thumbnail)}
                    className="img-fluid"
                    alt="Card"
                    style={{
                      borderRadius: '8px',
                      maxHeight: '130px',
                      minHeight: '130px',
                      objectFit: 'cover',
                      cursor: 'progress',
                      ...fitImageStyles,
                    }}
                  />
                ) : (
                  thumbnailImage ? 
                    <Image
                      src={thumbnailImage}
                      className="img-fluid"
                      alt="Card"
                      style={{
                        borderRadius: '8px',
                        maxHeight: '130px',
                        minHeight: '130px',
                        objectFit: 'cover',
                        ...fitImageStyles,
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/loading.gif'; 
                      }}
                    />
                    : 
                    <Image src='/loading.gif' roundedCircle style={{ width: '40px', height: '40px', transform: 'scale(2)'}} />
                )}
              </div>
            </Col>
            <Col xs={12} md={8}  className="order-md-2">
              <Row className="tags-row">
                <div className="mb-2">
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
                  {/*{(avatarEnssatImage || avatarImage) ? (*/}
                  {/*  <Image src={article?.fromEnssat ? avatarEnssatImage : avatarImage} alt="Author Avatar" roundedCircle style={{ width: '40px', height: '40px' }} />*/}
                  {/*) : (*/}
                  {/*  <Image src='/loading.gif' alt="Author Avatar" roundedCircle style={{ width: '40px', height: '40px', transform: 'scale(2)'}} />*/}
                  {/*)}*/}
                  <div className="ms-3">
                    <p className="fw-bold mb-0">
                      {author?.FIRST_NAME} {author?.LAST_NAME}
                    </p>
                  </div>
                  <div>
                    <p className="m-0 ms-3 text-muted small">Posted {getTimeDifference(published_at)} ago</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
  
};

export default HorizontalCard;
