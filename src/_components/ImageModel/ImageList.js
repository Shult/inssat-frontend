import { Card, Row, Col, Image } from 'react-bootstrap';

const ImageList = ({ fileNames, setSelectedImage }) => {
  return (
    <div className="scrblList mt-3">
      <Row>
        {fileNames.map((file, index) => (
          <Col key={index} sm={6} md={4} lg={3}>
            <Card className="file-man-box" onClick={() => setSelectedImage(file)}>
              <Card.Body className="m-none">
                <div className="file-img-box">
                  <Image
                    className="mb-4 w-100"
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                    src={file.imageBlob}
                    alt="icon"
                    onError={(e) => {
                      const target = e.target;
                      target.src = '/loading.gif'; 
                    }
                      
                    }
                  />
                </div>
                <div className="file-man-title">
                  <h5 className="mb-0 text-overflow">{file.imageName}</h5>
                  <p className="mb-0">
                    <small>{file.imageBlob ? 'Image' : 'Error'}</small>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ImageList;
