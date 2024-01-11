import React, { useState } from 'react';
import { Card, Accordion } from 'react-bootstrap';
import ImpressionSkillView from "../ImpressionSkillView/ImpressionSkillView"
import {ISection, IAssessment, IGrade, IImpression, IActivity} from "../../../Services/activityReportInterfaces"

interface SectionProps {
    section: ISection;
    activities: IActivity[];
    impressions: IImpression[];
}

// function SectionSkillView({section, activities, impressions} : SectionProps) {
function SectionSkillView({section, activities, impressions} : SectionProps) {


    return (
        <Accordion defaultActiveKey="0" flush>
            <Card>
                <Card.Body>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header id="accordion"><h2 className={"heading4"}> {section.title} </h2></Accordion.Header>
                        <Accordion.Body>
                            {
                                activities.map((activity, index) =>
                                    <ImpressionSkillView
                                        key={index}
                                        activity={activity}
                                        impression={impressions.find(impression => impression.activity_id === activity.id)}
                                    />
                                )
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                </Card.Body>
            </Card>
        </Accordion>
    )
}

export default SectionSkillView;