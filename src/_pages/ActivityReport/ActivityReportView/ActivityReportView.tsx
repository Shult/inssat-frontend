import React, {useEffect, useState } from 'react';
// import Button from "../../../_components/Clickable/Button";

import {Button, Card, Col, Dropdown, Row } from 'react-bootstrap';
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

import {getAssessments, getPeriods, getSectionsWithActivitiesAndImpressionsByPeriodAndUserId } from '../../../_api/ActivityReportServices';
import { useNavigate } from 'react-router-dom';

const ActivityReportView = () => {
    const [data, setData] = useState<IDataApi>({ sections: [] });

    const [title, setTitle] = useState('Sélectionner une période');

    const [periodId, setPeriodId] = useState(1);
    const [userId, setUserId] = useState("b307a9d1-21ec-4ad8-a53e-f72f14f5fb6e");
    const [periods, setPeriods] = useState<IPeriod[]>([]);
    const [assessments, setAssessments] = useState<IAssessment[]>([]);

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

    const fetchAssessment = async () : Promise<IAssessment[]> => {
        try {
            const response = await getAssessments();
            if (response.ok && response.data) {
                const dataApi : IAssessment[] = response.data;
                // console.log("dataApi Period : " + dataApi);
                // Traitez et affichez les données ici
                return dataApi
            } else {
                // Gérez les erreurs ici (par exemple, réponse non ok)
                console.error('Erreur lors de la récupération des sections 2');
                return [];
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des sections 1 :', error);
            return [];
        }
    };

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
        fetchAssessment().then(fetchedAssessments => {
            setAssessments(fetchedAssessments);
        });
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


    const dataGradeTmp1 : IGrade = {
        id: 1,
        grade: 20,
        student_id: "b307a9d1-21ec-4ad8-a53e-f72f14f5fb6e",
        assessment_id: 1,
        period_id: 1,
        comment: "string",
        // created_at: Date,
        // updated_at: Date
    }
    const dataGradeTmp2 : IGrade = {
        id: 1,
        grade: 19,
        student_id: "b307a9d1-21ec-4ad8-a53e-f72f14f5fb6e",
        assessment_id: 2,
        period_id: 1,
        comment: "string",
        // created_at: Date,
        // updated_at: Date
    }
    const dataGradeTmp3 : IGrade = {
        id: 1,
        grade: 18,
        student_id: "b307a9d1-21ec-4ad8-a53e-f72f14f5fb6e",
        assessment_id: 3,
        period_id: 1,
        comment: "string",
        // created_at: Date,
        // updated_at: Date
    }
    const dataGradeTmpList : IGrade[] = [
        dataGradeTmp1,
        dataGradeTmp2,
        dataGradeTmp3
    ]

    const navigate = useNavigate();
    const navigateToActivityReport = (path : string) => {
        navigate(path);
    };

    // console.log("Period Selected = "+ periodSelected);
    return(
        <div className="container" id={"activityReport"}>
            <Row>
                <Col xs={12} md={12} lg={4} xl={4}>
                    <h2 className="heading2">Bilan d'activités - Période : </h2>
                </Col>
                <Col xs={12} md={12} lg={7} xl={7}>
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
                <Col xs={12} md={12} lg={1} xl={1}>
                    <Button
                        variant="secondary"
                        content={"Retour"}
                        onClick={() => navigateToActivityReport('/apprenticeshipTickets')}
                    >
                        Retour
                    </Button>{' '}

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
                            <SectionNotationView
                                assessments = {assessments.slice(0,3)}
                                grades = {dataGradeTmpList}
                            ></SectionNotationView>
                        </Card.Body>
                    </Card>
                </>
            )}
        </div>
    )
}

export default ActivityReportView