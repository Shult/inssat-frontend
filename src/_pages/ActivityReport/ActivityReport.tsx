    import React, {FormEvent, useEffect, useState } from 'react';
    import "../../_components/ToolBox/styles.css";
    import Section from "../../_components/ActivityReport/Skill/Section/Section";
    import activityReportData from "../../_components/ActivityReport/Services/tmpData";
    import { Card, Col, Dropdown, Row } from 'react-bootstrap';
    import "./ActivityReport.css";
    import SectionNotation from "../../_components/ActivityReport/Notation/SectionNotation/SectionNotation";
    import { getSections, getSectionsWithActivities, getPeriods, postImpression, postGrade, getAssessments } from '../../_api/ActivityReportServices';
    import {
    FormGrades,
    FormImpressions,
    IActivity,
    IActivity2,
        IAssessment,
    IPeriod,
    ISection,
    ISectionApi
} from "../../_components/ActivityReport/Services/activityReportInterfaces";

    
    const ActivityReport = () => {
        const [blogText, setBlogText] = React.useState('hello world');
        const [title, setTitle] = useState('Sélectionner une période');
        //const assessments = activityReportData.assessments;

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

        // GET
        const [sections, setSections] = useState<ISectionApi[]>([]);
        const [periods, setPeriods] = useState<IPeriod[]>([]);
        const [assessments, setAssessments] = useState<IAssessment[]>([]);

        // État pour stocker les données du formulaire pour les impressions
        const [impressionData, setImpressionData] = useState<FormImpressions[]>([]);

        // État pour stocker les données du formulaire pour les notes
        const [gradeData, setGradeData] = useState<FormGrades[]>([]);

        const handleSelect = (period : any) => {
            setTitle(period);
            setPeriodSelected(period)
            // console.log("Selected period = " + periodSelected)
        };

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
        
        const fetchAndDisplaySections = async () : Promise<ISectionApi[]> => {
            try {
                const response = await getSectionsWithActivities();
                if (response.ok && response.data) {
                    const dataApi : ISectionApi[] = response.data;
                    // console.log("dataApi Section : " + dataApi);
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

        useEffect(() => {
            fetchAssessment().then(fetchedAssessments => {
                setAssessments(fetchedAssessments);
            });
            fetchPeriods().then(fetchedPeriods => {
                setPeriods(fetchedPeriods);
            });
            fetchAndDisplaySections().then(fetchedSections => {
                setSections(fetchedSections);
            });
        }, []);
        
        return(
            <div className="container" id={"activityReport"}>
                    <Row>
                        <Col xs={12} md={12} lg={3} xl={4}>
                            <h2 className="heading2">Bilan d'activités - Période : </h2>
                        </Col>

                        <Col xs={12} md={12} lg={9} xl={8}>
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
                        <Card className="horizontal-card mb-3" style={{ borderRadius: '8px', boxShadow: 'var(--box-shadow)' }}>
                            <Card.Body id={"skill-container"}>
                                {
                                    sections.map((section, index) => {
                                        if (section.title !== "Notation") {
                                            return (
                                                <div key={section.id}>
                                                    <Section
                                                        section={section}
                                                        activities={section.activities}
                                                        periodId={periodSelected}
                                                    />
                                                </div>
                                            );
                                        }
                                        return null;
                                    })
                                }
                            </Card.Body>
                        </Card>

                        <Card className="horizontal-card mb-3" style={{ borderRadius: '8px', boxShadow: 'var(--box-shadow)' }}>
                            <Card.Body id={"skill-container"}>
                                <SectionNotation
                                    assessments={assessments.slice(0,3)}
                                    periodId={periodSelected}
                                />
                            </Card.Body>
                        </Card>
                    </>
                )}
            </div>
        )
    }

    export default ActivityReport

