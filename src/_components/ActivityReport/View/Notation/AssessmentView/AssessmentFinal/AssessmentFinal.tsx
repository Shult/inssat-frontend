import React from "react";
import { Row, Col } from 'react-bootstrap';
import "./AssessmentFinal.css";

export const AssessmentFinal = (grades : any): JSX.Element => {

    const sum = grades.grades.reduce((acc : any, grade : any) => acc + grade.grade, 0);
    const mean = sum / grades.grades.length;

    const meanFixed = mean.toFixed(1).toString(); // Convert to string to manipulate
    const [entier, decimal] = meanFixed.split('.');

    console.log("Moyenne =", mean);

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
            <Col>
                <h2 className={"heading4 finalComment"}>Bien</h2>
            </Col>
        </Row>
    );
};