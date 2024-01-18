    import React, {FormEvent, useEffect, useState } from 'react';
    import "../../_components/ToolBox/styles.css";
    import Section from "../../_components/ActivityReport/Skill/Section/Section";
    import activityReportData from "../../_components/ActivityReport/Services/tmpData";
    import { Card, Col, Dropdown, Row } from 'react-bootstrap';
    import "./ActivityReport.css";
    import SectionNotation from "../../_components/ActivityReport/Notation/SectionNotation/SectionNotation";
    import { getSections, getSectionsWithActivities, getPeriods, postImpression, postGrade } from '../../_api/ActivityReportServices';
    import {IActivity, IActivity2, IPeriod, ISection, ISectionApi} from "../../_components/ActivityReport/Services/activityReportInterfaces";

    interface FormImpressions {
        content: string,
        level_id: number,
        activity_id: number,
        period_id: number,
        student_id: number,
    }

    interface FormGrades {
        student_id: number,
        grade: number,
        assessment_id: number,
        period_id: number,
        comment: string,
        section_id: number,
    }

    const ActivityReport = () => {
        const [blogText, setBlogText] = React.useState('hello world');
        const [title, setTitle] = useState('Sélectionner une période');
        const assessments = activityReportData.assessments;

        // GET
        const [sections, setSections] = useState<ISectionApi[]>([]);
        const [periods, setPeriods] = useState<IPeriod[]>([]);

        // POST
        // const [formImpression, setFormData] = useState({ /* initial state */ });

        // const handleSubmitImpression = async (event : FormEvent<HTMLFormElement>) => {
        //     event.preventDefault();
        //     try {
        //         const response = await postImpression(formImpression);
        //         console.log('Réponse du serveur:', response.data);
        //     } catch (error) {
        //         console.error('Erreur lors de l\'envoi du formulaire:', error);
        //     }
        // };


        // État pour stocker les données du formulaire pour les impressions
        const [impressionData, setImpressionData] = useState<FormImpressions[]>([]);

        // État pour stocker les données du formulaire pour les notes
        const [gradeData, setGradeData] = useState<FormGrades[]>([]);

        const handleSubmitAll = async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            try {
                // Envoyer les impressions
                for (const impression of impressionData) {
                    await postImpression(impression);
                }

                // Envoyer les notes
                for (const grade of gradeData) {
                    await postGrade(grade); // Supposons que postGrade est votre méthode POST pour les notes
                }

                console.log('Toutes les données ont été envoyées avec succès');
            } catch (error) {
                console.error('Erreur lors de l\'envoi des données:', error);
            }
        };

        // Fonction pour mettre à jour les données d'impression
        const updateImpressionData = (impression: any) => {
            // Mettez à jour l'état des impressions ici
        };

        // Fonction pour mettre à jour les données d'évaluation
        const updateAssessmentData = (assessment: any) => {
            // Mettez à jour l'état des évaluations ici
        };







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
            fetchPeriods().then(fetchedPeriods => {
                setPeriods(fetchedPeriods);
            });
            fetchAndDisplaySections().then(fetchedSections => {
                setSections(fetchedSections);
            });
        }, []);
        
        return(
            <div className="container" id={"activityReport"}>
                <form onSubmit={handleSubmitAll}>
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
                                            <Dropdown.Item key={index} eventKey={period.name} href={`#/period-${period.id}`}>{period.name}</Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>

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
                                assessments={assessments}
                            />
                        </Card.Body>
                    </Card>

                    <button type="submit">Envoyer</button>
                </form>
            </div>
        )
    }

    export default ActivityReport

