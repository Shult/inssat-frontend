    import React, { useState } from 'react';
    import "../../_components/ToolBox/styles.css";
    import Section from "../../_components/ActivityReport/Skill/Section/Section";
    import activityReportData from "../../_components/ActivityReport/Services/tmpData";
    import { Card, Col, Dropdown, Row } from 'react-bootstrap';
    import "./ActivityReport.css";
    import SectionNotation from "../../_components/ActivityReport/Notation/SectionNotation/SectionNotation";

    const ActivityReport = () => {
        const [blogText, setBlogText] = React.useState('hello world');
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

        const assessments = activityReportData.assessments;
        return(
            <div className="container" id={"activityReport"}>

                <Row>
                    <Col xs={3}>
                        <h2 className="heading2">Bilan d'activités </h2>
                    </Col>
                    <Col xs={9}>
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

                <Card className="horizontal-card mb-3" style={{ borderRadius: '8px', boxShadow: 'var(--box-shadow)' }}>
                    <Card.Body id={"skill-container"}>
                    {
                        activityReportData.sections.map((section, index) => (
                            <div key={index}>
                                <Section
                                    key={ section.id }
                                    section={ section }
                                    activities={ activityReportData.activities.filter(activity => activity.section_id === section.id)}
                                    impressions={ activityReportData.impressions }
                                />
                            </div>
                        ))
                    }
                    </Card.Body>
                </Card>

                <Card className="horizontal-card mb-3" style={{ borderRadius: '8px', boxShadow: 'var(--box-shadow)' }}>
                    <Card.Body id={"skill-container"}>
                        <SectionNotation
                            assessments={assessments}
                        />
                    </Card.Body>
                </Card>
            </div>
        )
    }

    export default ActivityReport

