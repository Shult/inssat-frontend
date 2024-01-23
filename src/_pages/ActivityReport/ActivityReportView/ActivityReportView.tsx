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
    ISectionApi2,
    IPeriod
} from "../../../_components/ActivityReport/Services/activityReportInterfaces"

import {getPeriods, getSectionsWithActivitiesAndImpressionsByPeriodAndUserId } from '../../../_api/ActivityReportServices';

const ActivityReportView = () => {
    const [data, setData] = useState<IDataApi>({ sections: [] });

    const [title, setTitle] = useState('Sélectionner une période');

    const [periodId, setPeriodId] = useState(1);
    const [userId, setUserId] = useState("b307a9d1-21ec-4ad8-a53e-f72f14f5fb6e");
    const [periods, setPeriods] = useState<IPeriod[]>([]);

    const defaultPeriod: IPeriod = {
        id: 0,
        name: "default",
        description: "default",
        number: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const [periodSelected, setPeriodSelected] = useState<number>(0);
    const isDefaultPeriodSelected = periodSelected === defaultPeriod.id;
    
    const fetchPeriods = async () : Promise<IPeriod[]> => {
        try {
            const response = await getPeriods();
            if (response.ok && response.data) {
                const dataApi : IPeriod[] = response.data;
                return dataApi
            } else {
                console.error('Erreur lors de la récupération des sections 2');
                return [];
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des sections 1 :', error);
            return [];
        }
    };

    const handleSelect = (period : any) => {
        setTitle(period);
        setPeriodSelected(period)
    };

    useEffect(() => {
        setUserId("b307a9d1-21ec-4ad8-a53e-f72f14f5fb6e");
        fetchPeriods().then(fetchedPeriods => {
            setPeriods(fetchedPeriods);
        });

        getSectionsWithActivitiesAndImpressionsByPeriodAndUserId(periodSelected, userId)
            .then(response => {
                if (response.ok && response.data) {
                    setData({ sections: response.data });
                } else {
                    console.error('Erreur lors de la récupération des données');
                }
            })
            .catch(error => {
                console.error('Erreur lors de la connexion à l\'API:', error);
            });

        }, [periodSelected, userId]
    );

    console.log("Period Selected = "+ periodSelected);
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
                            {
                                periods.slice(0, 6).map((period, index) => (
                                    <Dropdown.Item key={index} eventKey={period.id}>{period.id}</Dropdown.Item>
                                ))
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            {!isDefaultPeriodSelected && (
                <>
                    {/* Skill */}
                    <Card className="horizontal-card mb-3" style={{ borderRadius: '8px', boxShadow: 'var(--box-shadow)' }}>
                        <Card.Body id={"skill-container"}>
                            <div>
                                {
                                    data.sections && data.sections.length > 0
                                    ? data.sections.map((section : ISectionApi2, index : number) =>
                                        <SectionSkillView
                                            key = {index}
                                            section = {section}
                                        />
                                    )
                                    : <p>Aucune activité à afficher.</p>
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
                </>
            )}
        </div>
    )
}

export default ActivityReportView