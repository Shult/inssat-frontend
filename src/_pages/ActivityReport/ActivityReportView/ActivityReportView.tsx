import React, {useEffect, useState } from 'react';

import { Card, Col, Dropdown, Row } from 'react-bootstrap';
import SectionSkillView from "../../../_components/ActivityReport/View/Skill/SectionSkillView/SectionSkillView"
import SectionNotationView from "../../../_components/ActivityReport/View/Notation/SectionNotationView/SectionNotationView"
import {
    IAssessment,
    ISection,
    IGrade,
    IImpression,
    IActivity,
    IDataApi,
    ISectionApi2
} from "../../../_components/ActivityReport/Services/activityReportInterfaces"

import { getSectionsWithActivitiesAndImpressionsByPeriodAndUserId } from '../../../_api/ActivityReportServices';

const ActivityReportView = () => {
    const [data, setData] = useState<IDataApi>({ sections: [] });

    const [title, setTitle] = useState('Sélectionner une période');

    const [periodId, setPeriodId] = useState(1);
    const [userId, setUserId] = useState("b307a9d1-21ec-4ad8-a53e-f72f14f5fb6e");

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
    

    useEffect(() => {
        setUserId("b307a9d1-21ec-4ad8-a53e-f72f14f5fb6e");
        setPeriodId(2);
        getSectionsWithActivitiesAndImpressionsByPeriodAndUserId(periodId, userId)
            .then(response => {
                if (response.ok && response.data) {
                    // Traitez les données reçues ici
                    //console.log("getSectionsWithActivitiesAndImpressionsByPeriodAndUserId = "+response.data);
                    // setData(response.data);
                    setData({ sections: response.data });

                    // sections.map((section, index) =>
                    data.sections && data.sections.length > 0
                        ? console.log(true) : console.log(false)

                        response.data.map((section : any, index : number) =>
                        // console.log("Section "+ index+" = " + section.title)
                        section.activities.map((activity : any, index : number) =>
                            //console.log("Section "+ section.title +"\nActivity "+ index + " = " + activity.name)
                            activity.impressions.map((impression : any, index : number) =>
                                console.log(
                                    "Section = "+ section.title +"\n" +
                                    "Activity = " + activity.name+"\n" +
                                    "Impressions = "+ impression.level.id
                                )
                            )
                        )
                    )
                    console.log()
                } else {
                    // Gérez les erreurs ici
                    console.error('Erreur lors de la récupération des données');
                }
            })
            .catch(error => {
                // Gérez les erreurs ici
                console.error('Erreur lors de la connexion à l\'API:', error);
            });
        }, [periodId, userId]
    );
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
                        {/*{*/}
                        {/*    sections.map((section, index) =>*/}
                        {/*        <SectionSkillView*/}
                        {/*            key = {index}*/}
                        {/*            section = {section}*/}
                        {/*            activities={ activies.filter(activity => activity.section_id === section.id)}*/}
                        {/*            impressions={ impressions.filter(impression => (impression.student_id === student.id)) }*/}
                        {/*        />*/}
                        {/*    )*/}
                        {/*}*/}
                        {
                            data.sections && data.sections.length > 0
                            ? data.sections.map((section : ISectionApi2, index : number) =>
                                // console.log("Section "+ index+" = " + section.title)
                                <SectionSkillView
                                    key = {index}
                                    section = {section}
                                    // activities={ section.activities }
                                    // impressions={ impressions.filter(impression => (impression.student_id === student.id)) }
                                />
                                // section.activities.map((activity : any, index : number) =>
                                //     //console.log("Section "+ section.title +"\nActivity "+ index + " = " + activity.name)
                                //     activity.impressions.map((impression : any, index : number) =>
                                //         // console.log(
                                //         //     "Section = "+ section.title +"\n" +
                                //         //     "Activity = " + activity.name+"\n" +
                                //         //     "Impressions = "+ impression.level.id
                                //         // )
                                //
                                //     )
                                // )
                            )
                            : <p>Aucune activité à afficher.</p> // Ou gérer autrement le cas où il n'y a pas d'activités.
                        }
                    </div>
                </Card.Body>
            </Card>

            {/* Notation */}
            <Card className="horizontal-card mb-3" style={{ borderRadius: '8px', boxShadow: 'var(--box-shadow)' }}>
                <Card.Body id={"skill-container"}>
                    {/*<SectionNotationView*/}
                    {/*    assessments = {assessments}*/}
                    {/*    grades = {grades}*/}
                    {/*></SectionNotationView>*/}
                </Card.Body>
            </Card>

        </div>
    )
}

export default ActivityReportView