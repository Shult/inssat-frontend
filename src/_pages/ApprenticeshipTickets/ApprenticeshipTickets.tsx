import { Accordion, Card, Col, Row } from "react-bootstrap"
import React from "react";
import Button from "../../_components/Clickable/Button";

import "./ApprenticeshipTickets.css"
import { apprenticeshipTicketsMock, dataSuiviMock } from "../../_components/ApprenticeshipTickets/Services/apprenticeshipTickets.mock";
import SuiviInfoCard from "../../_components/ApprenticeshipTickets/SuiviCard/SuiviInfoCard";
import BilanAccordion from "../../_components/ApprenticeshipTickets/BilanAccordion/BilanAccordion";

import {Routes, Route, useNavigate} from 'react-router-dom';

const ApprenticeshipTickets = () => {


    const { company, student, supervisor, teacher } = dataSuiviMock;
    const listTickets = apprenticeshipTicketsMock;

    {/*LIEN TEMPORAIRE*/}
    const navigate = useNavigate();
    const navigateToActivityReport = (path : string) => {
        navigate(path);
    };

    return (
        <div>
            <h1>Fiches de spécification du travail en entreprise, de suivi et de bilan</h1>

            <div className="container">

            

            <Card>
                <Card.Body>
                    <Card.Title>Fiche de suivi</Card.Title>
                    <Row>
                        <Col className="container">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Entreprise</Card.Title>
                                    <ul>
                                        <li>Nom : {company.name}</li>
                                        <li>Adresse : {company.address}</li>
                                        <li>Ville : {company.city}</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                        <SuiviInfoCard title="Maitre d'apprentissage" data={supervisor} />
                    </Row>
                    <Row>
                        <SuiviInfoCard title="Tuteur" data={teacher} />
                        <SuiviInfoCard title="Elève" data={student} />
                    </Row>
                </Card.Body>
            </Card>

            </div>

            <div className="container">
            <Card>
                <Card.Body>
                    <Card.Title>Tickets d'évaluations</Card.Title>
                    
                    <BilanAccordion bilans={apprenticeshipTicketsMock} />

                    {/*LIEN TEMPORAIRE*/}
                    <div className="container center">
                            <Button className={"buttonWhite txtCenter"}
                                    content={"Créer un nouveau tickets"}
                                    onclick={() => navigateToActivityReport('/activityReport')}/>
                    </div>

                </Card.Body>
            </Card>
            </div>
        </div>
    )
}

export default ApprenticeshipTickets
