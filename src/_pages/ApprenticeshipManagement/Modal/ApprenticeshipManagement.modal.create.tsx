import "./ApprenticeshipManagement.modal.css"
import UserDropdown from "../../../_components/User/UserDropdown";
import Button from "../../../_components/Clickable/Button";
import {createAssociationMock} from "../../../_components/User/ApprenticeshipAssociation/Association.api";
import React from "react";


interface ModalAssociationProps {
    onValidate: () => void;
    show: boolean;
}
const ModalAssociationCreation: React.FC<ModalAssociationProps> = ({ onValidate, show }) => {
    if (!show) return null;

    return <>
        <article className={"line w100 space-between ApprenticeshipManagementModal"}>
            <h2 className={"w100"}>Créer une nouvelle association</h2>

            <UserDropdown className={"w100"} id={"select-student"} usertype={"student"}/>
            <UserDropdown className={"w100"} id={"select-tutor"} usertype={"teacher"}/>
            <UserDropdown className={"w100"} id={"select-supervisor"} usertype={"supervisor"}/>

            <div className={"line w100 space-around"}>
                <Button className={"buttonSuccess"}
                        name={"createApprenticeshipAssociation"}
                        content={"Valider"}
                        onclick={ () => {
                            createAssociationMock(
                                (document.getElementById("select-student") as HTMLSelectElement).value,
                                (document.getElementById("select-tutor") as HTMLSelectElement).value,
                                (document.getElementById("select-supervisor") as HTMLSelectElement).value
                            )
                            onValidate()
                        }}
                />
            </div>

        </article>
    </>
}

export default ModalAssociationCreation
