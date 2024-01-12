import React, {useEffect, useState } from 'react';

import {Button, Card, Col, Dropdown, Row } from 'react-bootstrap';
import SectionSkillView from "../../../_components/ActivityReport/View/Skill/SectionSkillView/SectionSkillView"
import SectionNotationView from "../../../_components/ActivityReport/View/Notation/SectionNotationView/SectionNotationView"
import {
    IPeriod
} from "../../../_components/ActivityReport/Services/activityReportInterfaces"

import {getAssessments,
    getGradesAndAssessmentsByPeriod, getPeriods } from '../../../_api/ActivityReportServices';
import { useNavigate } from 'react-router-dom';
import {Grade, Impression, Period, Section, UserData} from '../../../_components/ActivityReport/Services/interfaces';

const ActivityReportView = () => {
    const [userId, setUserId] = useState("0cabe1b3-e680-4cac-8d19-0fbeab35134e");
    const [data, setData] = useState<UserData>({
        ID: "",
        USERNAME: "",
        FIRST_NAME: "",
        LAST_NAME: "",
        EMAIL: "",
        USER_ATTRIBUTES: [],
        grades: [],
        impressions: []
    });
    const [sections, setSections] = useState<Section[]>();
    const [title, setTitle] = useState('Sélectionner une période');
    const [periods, setPeriods] = useState<Period[]>([]);
    const [periodSelected, setPeriodSelected] = useState<number>(0);
    const isDefaultPeriodSelected = periodSelected === 0;

    const fetchPeriods = async () : Promise<Period[]> => {
        try {
            const response = await getPeriods();
            if (response.ok && response.data) {
                const dataApi : Period[] = response.data;
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
        const periodNumber = Number(period); // Convertit en nombre si nécessaire
        setTitle(`Période ${periodNumber}`);
        setPeriodSelected(periodNumber);
    };

    useEffect(() => {
        // setUserId("b307a9d1-21ec-4ad8-a53e-f72f14f5fb6e"); // A MODIF EN ALLANT CHERCHER LE USER

        fetchPeriods().then(fetchedPeriods => {
            setPeriods(fetchedPeriods);
        });

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
                    let sectionsArray: Section[] = Array.from(sectionsMap.values()).filter((section : Section) => section.title !== "Notation");
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
                    setSections(sectionsArray);
                    setData(prevData => ({
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

        }, [periodSelected, userId]
    );

    const navigate = useNavigate();
    const navigateToActivityReport = (path : string) => {
        navigate(path);
    };

    return(
        <div className="container" id={"activityReport"}>
            <Row>
                <Col xs={12} md={12} lg={4} xl={4}>
                    <h2 className="heading2">Bilan d'activités : </h2>
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
                                    sections && sections.length > 0
                                    ? sections.map((section : Section, index : number) =>
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
                                grades = {data.grades}
                            ></SectionNotationView>
                        </Card.Body>
                    </Card>
                </>
            )}
        </div>
    )
}

export default ActivityReportView