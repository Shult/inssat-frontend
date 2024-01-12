import React from "react";
import { Row, Col } from 'react-bootstrap';
import "./Grade.css";

export function Grade({grade} : any) {
    return (
        <Row>
            <Col xs={6} className="grade">
                {grade}
            </Col>
            <Col xs={6} className="under">
                <span className={"span"}>/20</span>
            </Col>
        </Row>
    );
};
