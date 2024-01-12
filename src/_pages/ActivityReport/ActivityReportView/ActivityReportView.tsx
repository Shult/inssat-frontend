import React, { useState } from 'react';

import { Card, Col, Dropdown, Row } from 'react-bootstrap';
import SectionSkillView from "../../../_components/ActivityReport/View/Skill/SectionSkillView/SectionSkillView"
import SectionNotationView from "../../../_components/ActivityReport/View/Notation/SectionNotationView/SectionNotationView"
import {
    IAssessment,
    ISection,
    IGrade,
    IImpression,
    IActivity
} from "../../../_components/ActivityReport/Services/activityReportInterfaces"

import data from "../../../_components/ActivityReport/Services/tmpData"
import student1_period1 from '../../../_components/ActivityReport/Services/data_student1_period1'

const ActivityReportView = () => {
    const student = student1_period1.student;

    const sections = student1_period1.sections;
    const activies = student1_period1.activities;
    const impressions = student1_period1.impressions;

    const assessments = student1_period1.assessments;
    const grades = student1_period1.grades;

    const [title, setTitle] = useState('Sélectionner une période');

    const handleSelect = (eventKey : any) => {
        setTitle(eventKey);

        switch (eventKey) {
            case '1':
                break;
            case '2':
                break;
            default:
            //...
        }
    };
    return(
        <div className="container" id={"activityReport"}>
            <Row>
                <Col xs={12} md={12} lg={3} xl={3}>
                    <h2 className="heading2">Bilan d'activités </h2>
                </Col>
                <Col xs={12} md={12} lg={9} xl={9}>
                    <Dropdown onSelect={handleSelect}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className={"shadow activity-report-title"}>
                            { title }
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Période 1" href="#/action-1">Période 1</Dropdown.Item>
                            <Dropdown.Item eventKey="Période 2" href="#/action-2">Période 2</Dropdown.Item>
                            <Dropdown.Item eventKey="Période 3" href="#/action-3">Période 3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

            {/* Skill */}
            <Card className="horizontal-card mb-3" style={{ borderRadius: '8px', boxShadow: 'var(--box-shadow)' }}>
                <Card.Body id={"skill-container"}>
                    <div>
                        {
                            sections.map((section, index) =>
                                <SectionSkillView
                                    key = {index}
                                    section = {section}
                                    activities={ activies.filter(activity => activity.section_id === section.id)}
                                    impressions={ impressions.filter(impression => (impression.student_id === student.id)) }
                                />
                            )
                        }
                    </div>

                </Card.Body>
            </Card>

            {/* Notation */}
            <Card className="horizontal-card mb-3" style={{ borderRadius: '8px', boxShadow: 'var(--box-shadow)' }}>
                <Card.Body id={"skill-container"}>
                    <SectionNotationView
                        assessments = {assessments}
                        grades = {grades}
                    ></SectionNotationView>
                </Card.Body>
            </Card>

        </div>
    )
}

export default ActivityReportView