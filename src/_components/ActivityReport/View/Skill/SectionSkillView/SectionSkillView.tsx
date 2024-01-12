import { Card, Accordion } from 'react-bootstrap';
import ImpressionSkillView from "../ImpressionSkillView/ImpressionSkillView"
import {Activity, Section } from '../../../Services/interfaces';

interface SectionSkillViewProps {
    section: Section;
}

function SectionSkillView( sectionView : SectionSkillViewProps) {
    return (
        <Accordion defaultActiveKey="0" flush>
            <Card>
                <Card.Body>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header id="accordion"><h2 className={"heading4"}> {sectionView.section.title} </h2></Accordion.Header>
                        <Accordion.Body>
                            {
                                sectionView.section.activities && sectionView.section.activities.length > 0
                                    ? sectionView.section.activities.map((activity: Activity, index: number) => (
                                        <ImpressionSkillView
                                            key={index}
                                            activity={activity}
                                        />
                                    ))
                                    : <p>Aucune activité à afficher.</p>
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                </Card.Body>
            </Card>
        </Accordion>
    )
}

export default SectionSkillView;