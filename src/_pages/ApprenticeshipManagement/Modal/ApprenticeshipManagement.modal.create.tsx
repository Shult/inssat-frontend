import "./ApprenticeshipManagement.modal.css"
import UserDropdown from "../../../_components/User/UserDropdown";
import Button from "../../../_components/Clickable/Button";
import React from "react";
import {ModalCreateAssociationProps} from "../../../_components/User/ApprenticeshipAssociation/Association.interface";
import {createAssociation} from "../../../_components/User/ApprenticeshipAssociation/Association.api";
import {GROUP_ID_STUDENT, GROUP_ID_SUPERVISOR, GROUP_ID_TUTOR} from "../../../_helpers/constantes";




const ModalAssociationCreation: React.FC<ModalCreateAssociationProps> = ({ onValidate, show }) => {
    if (!show) return null;

    return <>
        <article className={"line w100 space-between ApprenticeshipManagementModal"}>
            <h2 className={"w100"}>Créer une nouvelle association</h2>

            <UserDropdown className={"w100"} id={"select-student"} usertype={GROUP_ID_STUDENT}/>
            <UserDropdown className={"w100"} id={"select-tutor"} usertype={GROUP_ID_TUTOR}/>
            <UserDropdown className={"w100"} id={"select-supervisor"} usertype={GROUP_ID_SUPERVISOR}/>

            <div className={"line w100 space-around"}>
                <Button className={"buttonSuccess"}
                        name={"createApprenticeshipAssociation"}
                        content={"Valider"}
                        onclick={ () => {
                            createAssociation([
                                (document.getElementById("select-student") as HTMLSelectElement).value,
                                (document.getElementById("select-tutor") as HTMLSelectElement).value,
                                (document.getElementById("select-supervisor") as HTMLSelectElement).value
                            ])
                            onValidate()
                        }}
                />
            </div>

        </article>
    </>
}

export default ModalAssociationCreation
