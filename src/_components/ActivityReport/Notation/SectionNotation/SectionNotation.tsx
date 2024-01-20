import React, { useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import "../../../ToolBox/styles.css"
import "./SectionNotation.css"
import Assessment from "../Assessment/Assessment"
import {IAssessment, IPeriod} from "../../Services/activityReportInterfaces"

interface SectionProps {
    assessments: IAssessment[];
    periodId: number;
}
// assessments : IAssessment[]
function SectionNotation({assessments, periodId} : SectionProps) {

    return(
        <Row>
            {
                assessments.map((assessment, index) =>
                    <Assessment
                        assessment={assessment}
                        key={index}></Assessment>
                )
            }
        </Row>
    )
}

export default SectionNotation;