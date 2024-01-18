import React, { useState } from 'react';
import { Card, Accordion } from 'react-bootstrap';
import "../../../ToolBox/styles.css"
import Impression from "../Impression/Impression"
import { ISection, IActivity, IImpression, IActivity2 } from "../../Services/activityReportInterfaces"
import "./section.css"

interface SectionProps {
    section: ISection;
    activities: IActivity2[];
}

function Section({section, activities} : SectionProps) {
    const [title, setTitle] = useState('Évaluer la compétence');
    const handleSelect = (eventKey : any) => {
        setTitle(eventKey);
    };

    // console.log(section);

    return(
        <Accordion defaultActiveKey="0" flush>
            <Card>
                <Card.Body>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header id="accordion"><h2 className={"heading4"}>{ section.title }</h2></Accordion.Header>
                            <Accordion.Body>
                                {
                                    activities.map(activity => (
                                        <Impression
                                            key={activity.id}
                                            activity={activity}
                                        />
                                    ))
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                </Card.Body>
            </Card>
        </Accordion>
    )
}

export default Section;