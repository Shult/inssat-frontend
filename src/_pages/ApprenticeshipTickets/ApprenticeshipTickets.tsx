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
import { FollowStudent, ListFollowStudent } from "../../_components/ApprenticeshipTickets/Services/apprenticeshipTickets.interface";
import { User_EntityInterface } from "../../_components/User/User.interface";

const ApprenticeshipTickets = () => {

    const roleManager = RoleManager();

    const [listTickets, setlistTickets] = useState<any>([]);
    const [ListStudentFollow, setlistStudentFollow] = useState<any>([]);
    const [ficheSuivi, setficheSuivi] = useState<any>([]);
    const [StudentDisplay, setStudentDisplay] = useState<string>('');


    const userId = UserService.getTokenParsed();


    const [shouldUpdateStudentDisplay, setShouldUpdateStudentDisplay] = useState(false);

    useEffect(() => {
        if (roleManager.isApprentice || roleManager.isStudent) {
            console.log("je suis apprenti ou etudiant");
            console.log(userId.sub);
            setStudentDisplay(userId.sub);
        } else if (roleManager.isApprenticeshipManager) {
            console.log("je suis ma");
            // Gestion affichage des boutons si plusieurs etudiants
            getStudentMaForMa(userId.sub).then(result => setlistStudentFollow(result));
            setShouldUpdateStudentDisplay(true);
        } else if (roleManager.isStudentTutor) {
            console.log("je suis tutor");
            // Gestion affichage des boutons si plusieurs etudiants
            getStudentMaForTutor(userId.sub).then(result => setlistStudentFollow(result));
            setShouldUpdateStudentDisplay(true);
        }
    }, []);

    useEffect(() => {
        if (shouldUpdateStudentDisplay && ListStudentFollow && Object.keys(ListStudentFollow).length > 0) {
            const firstFollow = Object.values<FollowStudent>(ListStudentFollow)[0];
            const studentId = firstFollow?.student?.ID || "";
            setStudentDisplay(studentId);
            setShouldUpdateStudentDisplay(false);
        }
    }, [ListStudentFollow, shouldUpdateStudentDisplay]);

    useEffect(() => {
        // Récupération ou Mise à jours de la fiche de suivi

        getDataStudentSuivi(StudentDisplay).then(result => setficheSuivi(result));

        getGradesTicketsSorted(StudentDisplay).then(result => setlistTickets(result));
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
                {hasRightMenu() && ListStudentFollow && Object.keys(ListStudentFollow).length === 1 ?
                    <>
                        <span>Elève suivi : </span>
                        <Button
                            className={"buttonGold txtCenter "}
                            content={`${ListStudentFollow[Object.keys(ListStudentFollow)[0]]?.student.FIRST_NAME} ${ListStudentFollow[Object.keys(ListStudentFollow)[0]]?.student.LAST_NAME}`}                    />

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
                                            <li>Nom : {ficheSuivi?.COMPANY ? ficheSuivi?.COMPANY[0]?.name : ""}</li>
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

                        { ((roleManager.isApprenticeshipManager || roleManager.isStudentSupervisor || roleManager.isStudentTutor) && (listTickets && Object.keys(listTickets).length < 7)) ?
                            <div className="container center">
                                <Button className={"buttonWhite txtCenter"} content={"Créer un nouveau tickets"} onclick={() => navigateToActivityReport(String(StudentDisplay), ((Object.keys(listTickets).length + 1)))}/>
                            </div> : <></>
                        }
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default ApprenticeshipTickets
