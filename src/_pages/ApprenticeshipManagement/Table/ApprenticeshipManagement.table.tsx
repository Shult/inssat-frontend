import React, {useState} from "react";
import {CDBSidebarMenuItem} from "cdbreact";
import Modal from "../../../_components/Modal/Modal";

import Button from "../../../_components/Clickable/Button";
import ModalAssociationUpdate from "../Modal/ApprenticeshipManagement.modal.update";

import "./ApprenticeshipManagement.table.css"
import {AssociationInterface} from "../../../_components/User/ApprenticeshipAssociation/Association.interface";
import {removeAssociation} from "../../../_components/User/ApprenticeshipAssociation/Association.api";
import {UserInterface} from "../../../_components/User/User.interface";

const ApprenticeshipManagementTable = ({ associations, students, tutors, supervisors }: any) => {
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [student_id, setStudentUUID] = useState("");
    const [association_id, setAssociationID] = useState(null);

    function solveUserInformation(id: string): UserInterface{

        let user: UserInterface = {email: "", firstname: "", group: "", lastname: "", status: "idle", uuid: ""}

        for (let i = 0; i < students.length; i++) {
            if (students[i].uuid === id){
                user = students[i]
            }
        }

        if (user.uuid === ""){
            for (let i = 0; i < tutors.length; i++) {
                if (tutors[i].uuid === id){
                    user = tutors[i]
                }
            }
        }

        if (user.uuid === ""){
            for (let i = 0; i < supervisors.length; i++) {
                if (supervisors[i].uuid === id){
                    user = supervisors[i]
                }
            }
        }
        return user
    }

    return (
        <>
            <article className={"line w100 space-around"} id={"ApprenticeshipManagementTable"}>

                <Modal show={showModalUpdate} onClose={() => setShowModalUpdate(false)}>
                    <ModalAssociationUpdate onValidate={() => setShowModalUpdate(false)}
                                            show={showModalUpdate}
                                            idAssociation={association_id}
                                            student={solveUserInformation(student_id)}
                    />
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
                        (association: AssociationInterface) =>
                            <tr>
                                <td className={"txtCenter"}>
                                    <input
                                        type={'checkbox'}
                                        name={'AssociationCheckbox'}
                                        value={association.id}
                                    />
                                </td>
                                <td>
                                    <div className={"line w100"}>
                                        <p>{ solveUserInformation(association.student_id).firstname }</p>
                                        <p>{ solveUserInformation( association.student_id).lastname.toUpperCase() }</p>
                                    </div>
                                </td>
                                <td>
                                    <div className={"line w100"}>
                                        <p>{ solveUserInformation(association.tutor_id).firstname }</p>
                                        <p>{ solveUserInformation( association.tutor_id).lastname.toUpperCase() }</p>
                                    </div>
                                </td>
                                <td>
                                    <div className={"line w100"}>
                                        <p>{ solveUserInformation(association.ma_id).firstname }</p>
                                        <p>{ solveUserInformation(association.ma_id).lastname.toUpperCase() }</p>
                                    </div>
                                </td>
                                <td>
                                    <button id="edit-button" onClick={() => {
                                        setShowModalUpdate(!showModalUpdate)
                                        setAssociationID(association.id)
                                        setStudentUUID(association.student_id)
                                    }}>
                                        <CDBSidebarMenuItem icon={"edit"}/>
                                    </button>
                                </td>
                                <td>
                                    <button id="delete-button"  onClick={() => {
                                        window.confirm("Confirmez-vous la suppression de cette association ?") ?
                                            removeAssociation(association.id) : console.log()
                                    }}>
                                        <CDBSidebarMenuItem icon={"trash"}/>
                                    </button>
                                </td>
                            </tr>
                    )}
                    </tbody>
                </table>
            </article>

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
        const checkboxes = document.getElementsByName('AssociationCheckbox');
        for (const checkbox of checkboxes) {
            if ((checkbox as HTMLInputElement).checked) {
                const id = checkbox.getAttribute("value")
                id ? removeAssociation(id) : console.log("id null")
            }
        }
    }
}



export default ApprenticeshipManagementTable
