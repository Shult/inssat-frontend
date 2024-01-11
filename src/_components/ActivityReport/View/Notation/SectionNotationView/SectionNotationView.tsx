import React, { useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import {IAssessment, IGrade} from "../../../Services/activityReportInterfaces"
import AssessmentView from "../AssessmentView/AssessmentView"
import {AssessmentFinal} from "../AssessmentView/AssessmentFinal/AssessmentFinal"

interface SectionProps {
    assessments: IAssessment[];
    grades: IGrade[];
}

function SectionNotationView({assessments, grades} : SectionProps) {

    return(
        <Row>
            {
                assessments.map((assessment, index) =>
                    <AssessmentView
                        key={index}
                        assessment={assessment}
                        grade={grades.find(grade => grade.assessment_id == assessment.id)}
                    ></AssessmentView>
                )
            }
            <Col>
                <AssessmentFinal
                    grades={grades}
                ></AssessmentFinal>
            </Col>
        </Row>
    )
}

export default SectionNotationView;