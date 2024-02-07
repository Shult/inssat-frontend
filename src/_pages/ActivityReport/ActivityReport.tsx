import React, {useEffect, useState } from 'react';
import "../../_components/ToolBox/styles.css";
import Section from "../../_components/ActivityReport/Skill/Section/Section";
import {Button, Card, Col, Dropdown, Row } from 'react-bootstrap';
import "./ActivityReport.css";
import SectionNotation from "../../_components/ActivityReport/Notation/SectionNotation/SectionNotation";
import { getSectionsWithActivities, getPeriods, getAssessments } from '../../_api/ActivityReportServices';
import {
    IAssessment,
    IPeriod,
    ISectionApi
} from "../../_components/ActivityReport/Services/activityReportInterfaces";
import { useNavigate, useParams } from 'react-router-dom';


const ActivityReport = () => {
    const { studentId, periodId } = useParams();
    // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    // console.log(studentId);
    // console.log(periodId);
    
    const [title, setTitle] = useState<any>('Sélectionner une période');
    const defaultPeriod: IPeriod = {
        id: 0,
        name: "default",
        description: "default",
        number: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    const [periodSelected, setPeriodSelected] = useState<any>(0);
    const isDefaultPeriodSelected = periodSelected === defaultPeriod.id;

    // GET
    const [sections, setSections] = useState<ISectionApi[]>([]);
    const [periods, setPeriods] = useState<IPeriod[]>([]);
    const [assessments, setAssessments] = useState<IAssessment[]>([]);
    const navigate = useNavigate();
    const navigateToActivityReport = (path : string) => {
        navigate(path);
    };
    const handleSelect = (period : any) => {
        setTitle(period);
        setPeriodSelected(period)
    };

    const fetchAssessment = async () : Promise<IAssessment[]> => {
        try {
            const response = await getAssessments();
            if (response.ok && response.data) {
                const dataApi : IAssessment[] = response.data;
                // console.log("dataApi Period : " + dataApi);
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

    const fetchPeriods = async () : Promise<IPeriod[]> => {
        try {
            const response = await getPeriods();
            if (response.ok && response.data) {
                const dataApi : IPeriod[] = response.data;
                // console.log("dataApi Period : " + dataApi);
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

    const fetchAndDisplaySections = async () : Promise<ISectionApi[]> => {
        try {
            const response = await getSectionsWithActivities();
            if (response.ok && response.data) {
                const dataApi : ISectionApi[] = response.data;
                // console.log("dataApi Section : " + dataApi);
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

    useEffect(() => {
        //setUserId(studentId);
        setTitle(periodId);
        setPeriodSelected(periodId)

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
                                                    studentId={studentId}
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
                                studentId={studentId}
                            />
                        </Card.Body>
                    </Card>
                </>
            )}
        </div>
    )
}

export default ActivityReport

