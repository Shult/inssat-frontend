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
                                            studentId={"b307a9d1-21ec-4ad8-a53e-f72f14f5fb6e"} // NEED RECUP LE STUDENT EN QUESTION
                                            // 73222561-c889-42c9-9643-ee3ce74ca515 local
                                            // b307a9d1-21ec-4ad8-a53e-f72f14f5fb6e dapi
                                            periodId={1} // NEED RECUP LA PERIOD
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