import React from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { IApprentieceshipTickets, IGradeDto } from "../Services/apprenticeshipTickets.interface";
import Button from "../../Clickable/Button";

import {Routes, Route, useNavigate} from 'react-router-dom';

interface BilanAccordionProps {
    bilans: IApprentieceshipTickets[];
    studentId: any;
}

const BilanAccordion: React.FC<BilanAccordionProps> = ({ bilans, studentId }) => {

    const ToggleActivationLien = false;

    // Méthode pour calculer la note finale
    const calculateFinalGrade = (grades: IGradeDto[]): number => {
        // Assurez-vous que grades est non vide
        if (grades.length === 0) {
            return 0;
        }

        // Calcul de la moyenne pondérée en utilisant les notes et les coefficients
        const totalCoefficient = grades.reduce((acc, grade) => acc + grade.assessment_coefficient, 0);
        const totalWeightedGrade = grades.reduce((acc, grade) => acc + (grade.grade * grade.assessment_coefficient), 0);

        return totalWeightedGrade / totalCoefficient;
    };

    {/*LIEN TEMPORAIRE*/}
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
    

    return (
        <div className="container">
            <Accordion>
                {bilans.map((bilan, index) => (
                    <Accordion.Item key={index} eventKey={index.toString()}>
                        <Accordion.Header>{`Bilan période ${bilan.period}`}</Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                {bilan.grades.map((grade, gradeIndex) => (
                                    <Col key={gradeIndex}>
                                        <div>
                                            <p>{`${grade.assessment_name} : `}</p>
                                            <span>{grade.grade} / 20</span>
                                            
                                        </div>
                                    </Col>
                                ))}
                                <Col>
                                        <div>
                                            <p>Note finale : </p><span>{`${calculateFinalGrade(bilan.grades)} / 20`}</span>
                                        </div>
                                    </Col>
                                <Col>
                                {/*<Button
                                        className={"buttonGold txtCenter"}
                                        content={"Détail"}
                                        // Ajouter redirection vers Sylvain
                                        onclick={() => navigateToActivityReport(studentId, bilan.period)}
                                    />*/}
                                    <Button
                                        className={"buttonGold txtCenter"}
                                        content={"Détail"}
                                        // Ajouter redirection vers Sylvain
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
