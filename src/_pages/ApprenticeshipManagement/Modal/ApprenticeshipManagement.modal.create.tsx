import UserSelector from "../../../_components/User/UserSelector";
import Button from "../../../_components/Clickable/Button";
import {createAssociationMock} from "../../../_components/User/ApprenticeshipAssociation/Association.api";

import "./ApprenticeshipManagement.modal.css"

const ModalAssociationCreation = () => {
    return (
        <>
            <article className={"line w100 space-between ApprenticeshipManagementModal"}>
                <h2 className={"w100"}>Créer une nouvelle association</h2>

                <UserSelector className={"w100"} id={"select-student"} usertype={"student"}/>
                <UserSelector className={"w100"} id={"select-tutor"} usertype={"teacher"}/>
                <UserSelector className={"w100"} id={"select-supervisor"} usertype={"supervisor"}/>

                <div className={"line w100 space-around"}>
                    <Button className={"buttonSuccess"}
                            name={"createApprenticeshipAssociation"}
                            content={"Valider"}
                            onclick={ () => {
                                console.log("clicked on create")
                                createAssociationMock(
                                    (document.getElementById("select-student") as HTMLSelectElement).value,
                                    (document.getElementById("select-tutor") as HTMLSelectElement).value,
                                    (document.getElementById("select-supervisor") as HTMLSelectElement).value
                                )
                            }
                    }
                    />
                </div>

            </article>
        </>
    )
}

export default ModalAssociationCreation
