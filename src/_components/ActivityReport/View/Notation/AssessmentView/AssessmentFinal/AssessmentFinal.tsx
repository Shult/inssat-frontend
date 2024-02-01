import React from "react";
import { Row, Col } from 'react-bootstrap';
import "./AssessmentFinal.css";
import { Grade } from "../../../../Services/interfaces";

interface GradesViewProps {
    average: Number;
}
export const AssessmentFinal = ({average} : GradesViewProps): JSX.Element => {
    let entier = "0";
    let decimal = "0";

    if(average !== null){
        const meanFixed = average.toFixed(1).toString(); // Convert to string to manipulate
        [entier, decimal] = meanFixed.split('.');
    }

    return (
        <Row className={"assessmentFinal"}>
            <h2 className={"heading4"}>Note finale</h2>

            <Col xs={12} md={12} lg={12} xl={7} className="grade finalGrade">
                <span>{entier}</span>
                <span className="small-number">.{decimal}</span>
            </Col>

            <Col xs={12} md={12} lg={12} xl={5} className="under ">
                <span className={"finalSpan"}>/20</span>
            </Col>
        </Row>
    );
};