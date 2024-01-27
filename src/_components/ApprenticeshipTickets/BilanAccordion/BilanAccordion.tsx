import React from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { GradeInterface, ListTicketsInterface } from "../Services/apprenticeshipTickets.interface";
import Button from "../../Clickable/Button";

import { Routes, Route, useNavigate } from 'react-router-dom';

interface BilanAccordionProps {
    bilans: ListTicketsInterface;
    studentId: any;
}

const ToggleActivationLien = false;

const BilanAccordion: React.FC<BilanAccordionProps> = ({ bilans, studentId }) => {

    const ToggleActivationLien = false;

    // Méthode pour calculer la note finale
    const calculateFinalGrade = (grades: GradeInterface[]): number => {
        // Assurez-vous que grades est non vide
        if (grades.length === 0) {
            return 0;
        }

        // Calcul de la moyenne pondérée en utilisant les notes et les coefficients
        const totalCoefficient = grades.reduce((acc, grade) => acc + grade.assessment.coefficient, 0);
        const totalWeightedGrade = grades.reduce((acc, grade) => acc + (grade.grade * grade.assessment.coefficient), 0);

        return totalWeightedGrade / totalCoefficient;
    };

    const navigate = useNavigate();
    
    
    /*
    const navigateToActivityReport = (studentId: string, periodId: number) => {
        const path = `/activityReport?param1=${studentId}&param2=${periodId}`;
        navigate(path);
    };
    */

    
    const navigateToActivityReport = (path : string) => {
        navigate(path);
    };

    console.log("AAAAAAAAAA");
    console.log(bilans);

    return (
        <div className="container">
            <Accordion>
            {bilans && Object.keys(bilans).map((key, index) => (
                <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header>{`Bilan période ${key}`}</Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            {Array.isArray(bilans[key]) && bilans[key].map((grade, gradeIndex) => (
                                <Col key={gradeIndex}>
                                    <div>
                                        <p>{`${grade.assessment.name} : `}</p>
                                        <span>{grade.grade} / 20</span>
                                    </div>
                                </Col>
                            ))}
                            <Col>
                                {Array.isArray(bilans[key]) && bilans[key].length > 0 && (
                                    <div>
                                        <p>Note finale : </p>
                                        <span>{`${calculateFinalGrade(bilans[key])} / 20`}</span>
                                    </div>
                                )}
                            </Col>
                            <Col>
                            
                                <Button
                                    className={"buttonGold txtCenter"}
                                    content={"Détail"}
                                    onclick={() => navigateToActivityReport('/activityReportView')}
                                />
                            </Col>
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            ))}

            </Accordion>
        </div>
    );
};

export default BilanAccordion;
