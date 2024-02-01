import React, {useEffect, useState } from 'react';
import "../../_components/ToolBox/styles.css";
import Section from "../../_components/ActivityReport/Skill/Section/Section";
import {Button, Card, Col, Dropdown, Row } from 'react-bootstrap';
import "./ActivityReport.css";
import SectionNotation from "../../_components/ActivityReport/Notation/SectionNotation/SectionNotation";
import { getSectionsWithActivities, getPeriods, getAssessments, getGradesAndAssessmentsByPeriod } from '../../_api/ActivityReportServices';
import {
    IAssessment,
    IPeriod,
    ISectionApi
} from "../../_components/ActivityReport/Services/activityReportInterfaces";
import { useNavigate, useParams } from 'react-router-dom';
import {Grade, Impression, Section as SectionI, UserData } from '../../_components/ActivityReport/Services/interfaces';


const ActivityReport = () => {
    const { studentId, periodId } = useParams();
    
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


    const [userId, setUserId] = useState<string>();
    const [existingSection, setExistingSection] = useState<SectionI[]>([]);
    const [existingData, setExistingData] = useState<UserData>({
        ID: "",
        USERNAME: "",
        FIRST_NAME: "",
        LAST_NAME: "",
        EMAIL: "",
        USER_ATTRIBUTES: [],
        grades: [],
        impressions: []
    });


    const navigate = useNavigate();
    const navigateToActivityReport = (path : string) => {
        navigate(path);
    };
    const handleSelect = (period : any) => {
        console.log("Handle Select = " + period)
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

    console.log("UserId = " + userId + "\n" +
        "Period = " + periodSelected + "\n")

    useEffect(()=> {
        console.log("Period selected (userEffect) = " + periodSelected)
        
        getGradesAndAssessmentsByPeriod(userId, periodSelected)
            .then(response => {
                if (response.ok && response.data) {
                    // console.log("Data getGradesAndAssessmentsByPeriod = " + response.data)

                    let sectionsMap = new Map();
                    let activitiesMap = new Map();
                    let impressionsMap = new Map();


                    // Traiter les impressions pour extraire les sections
                    response.data.impressions.forEach((impression : Impression)  => {
                        sectionsMap.set(impression.activity.section.id, impression.activity.section);
                    });
                    // Traiter les grades pour extraire les sections (si applicable)
                    response.data.grades.forEach((grade : Grade) => {
                        sectionsMap.set(grade.section.id, grade.section);
                    });


                    // Traiter les impressions pour regrouper les activités par section
                    response.data.impressions.forEach((impression : Impression) => {
                        let section = sectionsMap.get(impression.activity.section.id);
                        if (section) {
                            if (!activitiesMap.has(section.id)) {
                                activitiesMap.set(section.id, []);
                            }
                            activitiesMap.get(section.id).push(impression.activity);
                        }
                    });


                    // Convertir les sectionsMap en tableau pour l'état
                    let sectionsArray: SectionI[] = Array.from(sectionsMap.values()).filter((section : SectionI) => section.title !== "Notation");
                    sectionsArray.forEach(section => {
                        if (activitiesMap.has(section.id)) {
                            section.activities = activitiesMap.get(section.id);
                        } else {
                            section.activities = [];
                        }
                    });


                    // Traiter les impressions pour regrouper par activité
                    response.data.impressions.forEach((impression: Impression) => {
                        let activityId = impression.activity_id;
                        if (!impressionsMap.has(activityId)) {
                            impressionsMap.set(activityId, []);
                        }
                        impressionsMap.get(activityId).push(impression);
                    });
                    sectionsArray.forEach(section => {
                        section.activities.forEach(activity => {
                            if (impressionsMap.has(activity.id)) {
                                activity.impressions = impressionsMap.get(activity.id);
                            } else {
                                activity.impressions = [];
                            }
                        });
                    });


                    sectionsArray.map((section, index) => {
                        console.log("Section " + index + " : " + section.title)
                    })
                    setExistingSection(sectionsArray);
                    setExistingData(prevData => ({
                        ...prevData,
                        impressions: response.data.impressions || prevData.impressions,
                        grades: response.data.grades.map((grade : Grade) => ({
                            ...grade,
                            assessment: grade.assessment
                        }))
                    }));
                } else {
                    console.error('Erreur lors de la récupération des données');
                }
            })
            .catch(error => {
                console.error('Erreur lors de la connexion à l\'API:', error);
            });
    }, [periodSelected]);

    useEffect(() => {
        setUserId(studentId);
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

    console.log("Existing data : \n"
        + "existingData : " + existingData + "\n"
        + "existingSection : " + existingSection + "\n"
    )

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
                                                    existingData={existingData}
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

