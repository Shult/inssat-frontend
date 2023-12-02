import React, { useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import "../../../ToolBox/styles.css"
import "./SectionNotation.css"
import Assessment from "../Assessment/Assessment"
import {IAssessment} from "../../Services/activityReportInterfaces"

interface SectionProps {
    assessments: IAssessment[];
}
// assessments : IAssessment[]
function SectionNotation({assessments} : SectionProps) {

    return(
        <Row>
            {
                assessments.map((assessment, index) =>
                    <Assessment assessment={assessment} key={index}></Assessment>
                )
            }
        </Row>
    )
}

export default SectionNotation;