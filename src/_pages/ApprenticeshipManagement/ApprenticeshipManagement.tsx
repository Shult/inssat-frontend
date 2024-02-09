import React, {useEffect, useState} from "react";
import Modal from "../../_components/Modal/Modal";

import Button from "../../_components/Clickable/Button";
import ApprenticeshipManagementTable from "./Table/ApprenticeshipManagement.table";
import ModalAssociationCreation from "./Modal/ApprenticeshipManagement.modal.create";

import {getUsersMock} from "../../_components/User/User.api";
import {AssociationInterface, AssociationsInterface} from "../../_components/User/ApprenticeshipAssociation/Association.interface";
import {associationMock} from "../../_components/User/User.mock";

import "./ApprenticeshipManagement.css"
import { getAllStudentMaTutors } from "../../_api/student-ma-tutors";
import { getDataAllStudentMaTutorsBySearched, getStudentMaTutors, getUserByID } from "../../_components/ApprenticeshipTickets/Services/apprenticeshipTicket.services";
import { Row } from "react-bootstrap";

const ApprenticeshipManagement = () => {


    const [showModalCreation, setShowModalCreation] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);

    const [searched, setSearched] = useState("");
    const [data, setData] = useState<any>([]);

    
    const [listeAssociation, setAssociation] = useState<any>([])
    //getStudentMaForMa(userId.sub).then(result => setlistStudentFollow(result));

    const associations = associationMock
    

    useEffect(() => {
        getStudentMaTutors().then(result => setAssociation(result));
    }, []);


    const searchForFata = ()=>{
        getDataAllStudentMaTutorsBySearched(searched)
        .then(result => setAssociation(result));

    }


    // useEffect(() => {
    //     console.log("Mise à jour des données");
    //     getDataAllStudentMaTutorsBySearched(searched).then(result => setAssociation(result));
    //     setUpdateTable(false);
    // }, [updateTable, searched]);
    

    useEffect(() => {
        console.log('Back;')
        console.log(listeAssociation);
        //getUserByID(listeAssociation[i].student_id).then(res=>console.log(res));
    }, [listeAssociation]);


    return (
        <div id={"ApprenticeshipManagement"}>
            <Row>
                <h3 className={"w50"}>Associations étudiant - tuteur - maître d'apprentissage</h3>
                <div className={"line w50 items-baseline space-between"}>
                    <input className={"w66"}
                           type={"text"}
                           name={'searchPostByName'}
                           placeholder={'Recherche par nom...'}
                           onChange={ e => setSearched(e.target.value) }
                    />
                    <Button
                        className={"buttonGold txtCenter"}
                        content={"Rechercher"}
                        
                        onclick={searchForFata}
                    />
                    <Button 
                        className={"buttonWhite txtCenter"}
                        content={"+ Nouvelle association"} 
                        onclick={() => setShowModalCreation(!showModalCreation)}
                    />
                </div>
            </Row>
            

            <Modal show={showModalCreation} onClose={() => setShowModalCreation(false)}>
                <ModalAssociationCreation onValidate={() => setShowModalCreation(false)} show={showModalCreation}/>
            </Modal>

           {listeAssociation && listeAssociation.length>0 && <ApprenticeshipManagementTable associations={listeAssociation}/>} 
        </div>
    )
}

export default ApprenticeshipManagement
