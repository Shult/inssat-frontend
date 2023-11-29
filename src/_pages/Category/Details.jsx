 
import React, { useEffect, useState } from 'react';
 
import './style.css'

import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Details = () => {
  // Access the parameters from the URL
  const { name } = useParams();
  
    return (
      <Container fluid className="w-100"> 
        <Row className="justify-content-center">
          <Col xs={12} md={12} lg={7} xl={8}>
          {name}
          </Col> 
        </Row>
      </Container>
    )

 
}
export default Details
