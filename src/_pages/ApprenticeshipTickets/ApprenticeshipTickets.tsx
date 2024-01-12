import { Card, Col, Row } from "react-bootstrap"
import React from "react";
import Button from "../../_components/Clickable/Button";

import "./ApprenticeshipTickets.css"
import { apprenticeshipTicketsMock, dataSuiviMock, listStudentSuiviMock } from "../../_components/ApprenticeshipTickets/Services/apprenticeshipTickets.mock";
import SuiviInfoCard from "../../_components/ApprenticeshipTickets/SuiviCard/SuiviInfoCard";
import BilanAccordion from "../../_components/ApprenticeshipTickets/BilanAccordion/BilanAccordion";

import {useNavigate} from 'react-router-dom';
import { RoleManager } from "../../_navigation/RoleManager";
import ButtonsMenu from "../../_components/ApprenticeshipTickets/ButtonsMenu/ButtonsMenu";

const ApprenticeshipTickets = () => {


    const { company, student, supervisor, teacher } = dataSuiviMock;
    const listTickets = apprenticeshipTicketsMock;
    const listStudentSuivi = listStudentSuiviMock;

    const roleManager = RoleManager()

    {/*LIEN TEMPORAIRE*/}
    const navigate = useNavigate();
    const navigateToActivityReport = (path : string) => {
        navigate(path);
    };

    const hasRightMenu = () => {
        return (roleManager.isApprenticeshipManager || roleManager.isStudentSupervisor || roleManager.isStudentTutor)
    }

    return (
        <div>
            <h1>Fiches de spécification du travail en entreprise, de suivi et de bilan</h1>

            
            <div className="container">
            {hasRightMenu() && listStudentSuivi.length === 1 ?
                <>
                    <span>Elève suivi : </span>
                    <Button
                    className={"buttonGold txtCenter "}
                    content={`${listStudentSuivi[0].firstname} ${listStudentSuivi[0].lastname}`} 
                    />
                    
                </> : <></>
            }

            {hasRightMenu() && listStudentSuivi.length > 1 && listStudentSuivi.length < 6 ?
                <>
                    <span>Liste des élèves suivi : </span>
                        <ButtonsMenu listStudentSuivi={listStudentSuivi}/>
                </> : <></>
            }
            </div>

            <div className="container">
            <Card>
                <Card.Body>
                    <Card.Title>Fiche de suivi</Card.Title>
                    <Row>
                        <Col className="container">
                            <Card>
                                <Card.Body style={{ backgroundColor: 'var(--gold)', color: 'white' }}>
                                    <Card.Title>Entreprise</Card.Title>
                                    <ul>
                                        <li>Nom : {company.name}</li>
                                        <li>Adresse : {company.address}</li>
                                        <li>Ville : {company.city}</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                        <SuiviInfoCard title="Maitre d'apprentissage" data={supervisor} style={{ backgroundColor: 'black', color: 'white' }}/>
                    </Row>
                    <Row>
                        <SuiviInfoCard title="Tuteur" data={teacher} style={{ backgroundColor: 'var(--gold)', color: 'white' }}/>
                        <SuiviInfoCard title="Elève" data={student} style={{ backgroundColor: 'black', color: 'white' }}/>
                    </Row>
                </Card.Body>
            </Card>

            </div>

            <div className="container">
            <Card>
                <Card.Body>
                    <Card.Title>Tickets d'évaluations</Card.Title>
                    
                    <BilanAccordion bilans={listTickets} />

                    { (roleManager.isApprenticeshipManager || roleManager.isStudentSupervisor || roleManager.isStudentTutor) ?
                     <div className="container center">
                        <Button className={"buttonWhite txtCenter"} content={"Créer un nouveau tickets"} onclick={() => navigateToActivityReport('/activityReport')}/>
                    </div> : <></>
                    }

 

                </Card.Body>
            </Card>
            </div>
        </div>
    )
}

export default ApprenticeshipTickets
