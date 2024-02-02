import React, { useState } from 'react';
import { Card, Accordion } from 'react-bootstrap';
import ImpressionSkillView from "../ImpressionSkillView/ImpressionSkillView"
import {ISection, IAssessment, IGrade, IImpression, IActivity, ISectionApi2, IActivityApi} from "../../../Services/activityReportInterfaces"

interface SectionProps {
    section: ISection;
    activities: IActivity[];
    impressions: IImpression[];
}

interface SectionSkillViewProps {
    section: ISectionApi2; // Cette interface doit correspondre à la structure de vos données section.
}
// function SectionSkillView({section, activities, impressions} : SectionProps) {
// function SectionSkillView({section, activities, impressions} : SectionProps) {
function SectionSkillView({ section }: SectionSkillViewProps) {
    return (
        <Accordion defaultActiveKey="0" flush>
            <Card>
                <Card.Body>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header id="accordion"><h2 className={"heading4"}> {section.title} </h2></Accordion.Header>
                        <Accordion.Body>
                            {
                                // Ajoutez une vérification ici pour vous assurer que `activities` est défini
                                section.activities && section.activities.length > 0
                                    ? section.activities.map((activity: IActivityApi, index: number) => (
                                        <ImpressionSkillView
                                            key={index}
                                            activity={activity}
                                        />
                                    ))
                                    : <p>Aucune activité à afficher.</p> // Ou gérer autrement le cas où il n'y a pas d'activités.
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                </Card.Body>
            </Card>
        </Accordion>
    )
}

export default SectionSkillView;