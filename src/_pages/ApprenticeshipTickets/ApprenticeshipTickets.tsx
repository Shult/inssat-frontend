import { Card, Col, Row } from "react-bootstrap"
import React, { useEffect, useState } from "react";
import Button from "../../_components/Clickable/Button";

import "./ApprenticeshipTickets.css"
import { apprenticeshipListStudentFollow, apprenticeshipListTicketsMock, apprenticeshipListeTicketsSortedMock, apprenticeshipSuiviStudentMock, apprenticeshipTicketsMock } from "../../_components/ApprenticeshipTickets/Services/apprenticeshipTickets.mock";
import SuiviInfoCard from "../../_components/ApprenticeshipTickets/SuiviCard/SuiviInfoCard";
import BilanAccordion from "../../_components/ApprenticeshipTickets/BilanAccordion/BilanAccordion";

import {useNavigate} from 'react-router-dom';
import { RoleManager } from "../../_navigation/RoleManager";
import ButtonsMenu from "../../_components/ApprenticeshipTickets/ButtonsMenu/ButtonsMenu";
import UserService from "../../services/UserServices";
import { getDataStudentSuivi, getGradesTickets, getGradesTicketsSorted, getGradesTicketsSorted2, getStudentMaForMa, getStudentMaForTutor } from "../../_components/ApprenticeshipTickets/Services/apprenticeshipTicket.services";

const ApprenticeshipTickets = () => {

    const roleManager = RoleManager();


    const ToggleRecuperationIdToken = false;
    const ToggleRecuperationListeTickets = false;
    const ToggleRecuperationFicheSuivi = false;
    const ToggleRecuperationListStudentFollow = false;


    const [listTickets, setlistTickets] = useState<any>([]);
    const [ListStudentFollow, setlistStudentFollow] = useState<any>([]);
    const [ficheSuivi, setficheSuivi] = useState<any>([]);
    const [StudentDisplay, setStudentDisplay] = useState<any>([]);

    const userId = ToggleRecuperationIdToken ? UserService.getTokenParsed() : ("b307a9d1-21ec-4ad8-a53e-f72f14f5fb6e");
    
    console.log("NOUVIOOOOOOOOOOOOOOOO");
    console.log(apprenticeshipListeTicketsSortedMock);
    console.log(Object.keys(apprenticeshipListeTicketsSortedMock).length)
    

    //console.log("ANCIENNNNNNNNNNNNNNNN");
    //console.log(apprenticeshipTicketsMock);

    useEffect(() => {
        if(roleManager.isApprentice || roleManager.isStudent){
            console.log("je suis apprenti ou etudiant");
            setStudentDisplay(userId);
            //Gestion de la récupéarion des notes de l'étudiant
            ToggleRecuperationListeTickets ? getGradesTicketsSorted(userId).then(result => setlistTickets(result)) : setlistTickets(apprenticeshipListeTicketsSortedMock);
            //Gestion de la fiche de suivi
            ToggleRecuperationFicheSuivi ? getDataStudentSuivi(userId).then(result => setficheSuivi(result)) : setficheSuivi(apprenticeshipSuiviStudentMock);
        }
        else if(roleManager.isApprenticeshipManager){
            console.log("je suis ma");
            //gestion affichage des boutons si plusieurs etudiant
            ToggleRecuperationListStudentFollow ? getStudentMaForMa(userId).then(result => setlistStudentFollow(result)) : setlistStudentFollow(apprenticeshipListStudentFollow);
            // Ajouter méthode pour séléctionner un étudiant
            setStudentDisplay(ListStudentFollow[0].student.ID);
            //Gestion de la récupéarion des notes de l'étudiant
            ToggleRecuperationListeTickets ? getGradesTicketsSorted(StudentDisplay).then(result => setlistTickets(result)) : setlistTickets(apprenticeshipListeTicketsSortedMock);
            //Gestion de la fiche de suivi
            ToggleRecuperationFicheSuivi ? getDataStudentSuivi(StudentDisplay).then(result => setficheSuivi(result)) : setficheSuivi(apprenticeshipSuiviStudentMock);

        }
        else if(roleManager.isStudentTutor){
            console.log("je suis tutor");
            //gestion affichage des boutons si plusieurs etudiant
            ToggleRecuperationListStudentFollow ? getStudentMaForTutor(userId).then(result => setlistStudentFollow(result)) : setlistStudentFollow(apprenticeshipListStudentFollow);
            // Ajouter méthode pour séléctionner un étudiant
            setStudentDisplay(ListStudentFollow[0].student.ID);
            //Gestion de la récupéarion des notes de l'étudiant
            ToggleRecuperationListeTickets ? getGradesTicketsSorted(StudentDisplay).then(result => setlistTickets(result)) : setlistTickets(apprenticeshipListeTicketsSortedMock);
            //Gestion de la fiche de suivi
            ToggleRecuperationFicheSuivi ? getDataStudentSuivi(StudentDisplay).then(result => setficheSuivi(result)) : setficheSuivi(apprenticeshipSuiviStudentMock);

        }        
      }, []);
      
    useEffect(() => {
        // Mise à jours liste Tickets
        ToggleRecuperationListeTickets ? getGradesTicketsSorted(StudentDisplay).then(result => setlistTickets(result)) : setlistTickets(apprenticeshipListeTicketsSortedMock);
        // Mise à jours de la fiche de suivi
        ToggleRecuperationFicheSuivi ? getDataStudentSuivi(StudentDisplay).then(result => setficheSuivi(result)) : setficheSuivi(apprenticeshipSuiviStudentMock);

    }, [StudentDisplay]);


    {/*LIEN TEMPORAIRE*/}
    const navigate = useNavigate();
    /*
    const navigateToActivityReport = (path : string) => {
        navigate(path);
    };*/

    const navigateToActivityReport = (studentId: string, periodId: number) => {
        const path = `/activityReport/${studentId}/${periodId}`;
        navigate(path);
    };

    const hasRightMenu = () => {
        return (roleManager.isApprenticeshipManager || roleManager.isStudentSupervisor || roleManager.isStudentTutor)
    }

    return (
        <div>
            <h1>Fiches de spécification du travail en entreprise, de suivi et de bilan</h1>

            
            <div className="container">
            {hasRightMenu() && ListStudentFollow && ListStudentFollow.length === 1 ?
                <>
                    <span>Elève suivi : </span>
                    <Button
                    className={"buttonGold txtCenter "}
                    content={`${ListStudentFollow[0]?.firstname} ${ListStudentFollow[0]?.lastname}`} 
                    />
                    
                </> : <></>
            }

            {hasRightMenu() && ListStudentFollow && ListStudentFollow.length > 1 && ListStudentFollow.length < 6 ?
                <>
                    <span>Liste des élèves suivi : </span>
                        <ButtonsMenu listStudentSuivi={ListStudentFollow}/>
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
                                        <li>Nom : {ficheSuivi?.COMPANY ? ficheSuivi?.COMPANY[0].name : ""}</li>
                                        <li>Adresse : {ficheSuivi?.COMPANY ? ficheSuivi?.COMPANY[0]?.address : ""}</li>
                                        <li>Ville : {ficheSuivi?.COMPANY ? ficheSuivi?.COMPANY[0]?.city : ""}</li>
                                        <li>Téléphone : {ficheSuivi?.COMPANY ? ficheSuivi?.COMPANY[0]?.phone : ""}</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                        <SuiviInfoCard title="Maitre d'apprentissage" data={ficheSuivi?.MA ? ficheSuivi?.MA[0] : ""} style={{ backgroundColor: 'black', color: 'white' }}/>
                    </Row>
                    <Row>
                        <SuiviInfoCard title="Tuteur" data={ficheSuivi?.TUTOR ? ficheSuivi?.TUTOR[0] : ""} style={{ backgroundColor: 'var(--gold)', color: 'white' }}/>
                        <Col className="container">
                            <Card>
                                <Card.Body style={{ backgroundColor: 'black', color: 'white' }}>
                                    <Card.Title>Elève</Card.Title>
                                    <ul>
                                        <li>Nom : {ficheSuivi?.LAST_NAME}</li>
                                        <li>Prénom : {ficheSuivi?.FIRST_NAME}</li>
                                        <li>Email : {ficheSuivi?.EMAIL}</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            </div>

            <div className="container">
            <Card>
                <Card.Body>
                    <Card.Title>Tickets d'évaluations</Card.Title>

                    {(listTickets && Object.keys(listTickets).length > 0)&&
                        <BilanAccordion bilans={listTickets} studentId={StudentDisplay}/>
                    }

                    { (roleManager.isApprenticeshipManager || roleManager.isStudentSupervisor || roleManager.isStudentTutor || roleManager.isStudent) ?
                     <div className="container center">
                        <Button className={"buttonWhite txtCenter"} content={"Créer un nouveau tickets"} onclick={() => navigateToActivityReport(StudentDisplay, ((Object.keys(listTickets).length + 1)))}/>
                    </div> : <></>
                    }
                </Card.Body>
            </Card>
            </div>
        </div>
    )
}

export default ApprenticeshipTickets
