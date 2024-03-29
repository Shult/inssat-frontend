import React, {useState} from "react";
import {CDBSidebarMenuItem} from "cdbreact";
import Modal from "../../../_components/Modal/Modal";

import Button from "../../../_components/Clickable/Button";
import ModalAssociationUpdate from "../Modal/ApprenticeshipManagement.modal.update";

import { getUsersMock } from "../../../_components/User/User.api";
import { deleteAssociationMock } from "../../../_components/User/ApprenticeshipAssociation/Association.api";

import "./ApprenticeshipManagement.table.css"
import {AssociationInterface, AssociationsInterface} from "../../../_components/User/ApprenticeshipAssociation/Association.interface";
import { getUserByID } from "../../../_components/ApprenticeshipTickets/Services/apprenticeshipTicket.services";
import UserData from "./UserData";
import { deleteStudentMaTutor } from "../../../_api/student-ma-tutors";

const ApprenticeshipManagementTable = ({associations, setAssociation}: any) => {
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [studentUUID, setStudentUUID] = useState("");

    console.log("associations");
    console.log(associations);

    return (
        <>
            <article className={"line w100 space-around"} id={"ApprenticeshipManagementTable"}>

                <Modal show={showModalUpdate} onClose={() => setShowModalUpdate(false)}>
                    <ModalAssociationUpdate onValidate={() => setShowModalUpdate(false)} show={showModalUpdate} studentUUID={studentUUID}/>
                </Modal>

                <table className={"w100"}>
                    <thead>
                    <tr>
                        <th className={"txtCenter"}>
                            <input type={'checkbox'}
                                   id={'mainAssociationCheckBox'}
                                   onClick={selectOrDisselectAll}
                            />
                        </th>
                        <th>Etudiant</th>
                        <th>Tuteur ENSSAT</th>
                        <th>Maître d'apprentissage</th>
                        <th colSpan={2}></th>
                    </tr>
                    </thead>
                    <tbody>
                    { associations.map(
                        (association: AssociationsInterface) =>
                        
                            <tr>
                                <td className={"txtCenter"}>
                                    <input
                                        type={'checkbox'}
                                        name={'AssociationCheckbox'}
                                        value={association.student_id}
                                    />
                                </td>
                                <UserData association={association} />
                                <td>
                                    <button id="edit-button" onClick={() => {
                                        setShowModalUpdate(!showModalUpdate)
                                        setStudentUUID(association.student_id)
                                    }}>
                                        <CDBSidebarMenuItem icon={"edit"}/>
                                    </button>
                                </td>
                                <td>
                                    <button id="delete-button"  onClick={() => {
                                        window.confirm("Confirmez-vous la suppression de cette association ?") ?
                                        deleteStudentMaTutor(association.id) : console.log()
                                        const updatedAssociations = associations.filter((item: { id: number; }) => item.id !== association.id);
                                        // Update the state with the filtered list
                                        setAssociation(updatedAssociations);
                                    }}>
                                        <CDBSidebarMenuItem icon={"trash"}/>
                                    </button>
                                </td>
                            </tr>
                    )}
                    </tbody>
                </table>
            </article>

            {/*
            <div className={"line w100"}>
                <Button className={'buttonError'}
                        name={'DeleteAllPosts'}
                        content={'Tout supprimer'}
                        onclick={() => {
                            if( window.confirm("Confirmez-vous la suppression de ces associations ?") ) {
                                deleteAssociationSelected()
                            }
                        }}
                />
            </div>
            
            */ }
            

        </>
    )
    function selectOrDisselectAll() {
        const mainCheckbox = document.getElementById('mainAssociationCheckBox');
        const checkboxes = document.getElementsByName('AssociationCheckbox');

        if ((mainCheckbox as HTMLInputElement).checked) {
            for (let i = 0; i < checkboxes.length; i++) {
                (checkboxes[i] as HTMLInputElement).checked = true
            }
        } else {
            for (let i = 0; i < checkboxes.length; i++) {
                (checkboxes[i] as HTMLInputElement).checked = false
            }
        }
    }

    function deleteAssociationSelected() {
        console.log("delete all on going")
        const checkboxes = document.getElementsByName('AssociationCheckbox');
        for (const checkbox of checkboxes) {
            if ((checkbox as HTMLInputElement).checked) {
                const id = checkbox.getAttribute("value")
                console.log(id)
                // id ? deleteAssociation(id) : console.log("id null")
                id ? deleteAssociationMock(id) : console.log("id null")
            }
        }
    }
}



export default ApprenticeshipManagementTable
