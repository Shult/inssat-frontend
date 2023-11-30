import React, {useEffect, useState} from "react";
import Modal from "../../_components/Modal/Modal";

import Button from "../../_components/Clickable/Button";
import ApprenticeshipManagementTable from "./Table/ApprenticeshipManagement.table";
import ModalAssociationCreation from "./Modal/ApprenticeshipManagement.modal.create";

import {getUsersMock} from "../../_components/User/User.api";
import {getAssociationsMock} from "../../_components/User/ApprenticeshipAssociation/Association.api";
import {AssociationInterface} from "../../_components/User/ApprenticeshipAssociation/Association.interface";
import {associationMock} from "../../_components/User/User.mock";

import "./ApprenticeshipManagement.css"

const ApprenticeshipManagement = () => {


    const [showModalCreation, setShowModalCreation] = useState(false);
    const [searched, setSearched] = useState("");
    // const [associations, setAssociation] = useState<any>([])

    const associations = associationMock

    useEffect(() => {
        // getAssociations().then((result: any) => setAssociation(result))
        // setAssociation(getAssociationsMock)
    }, []);

    function getAssociationsBySearch(searched: string, associations: AssociationInterface[]){
        if (searched.length <= 3){ return associations }
        else {
            let newList = []
            searched = searched.toUpperCase()
            for (let i = 0; i < associations.length; i++) {

                let studentFirstname = getUsersMock("uuid", associations[i].studentUUID).pop()?.firstname.toUpperCase()
                let studentLastname = getUsersMock("uuid", associations[i].studentUUID).pop()?.lastname.toUpperCase()

                let tutorFirstname = getUsersMock("uuid", associations[i].tutorUUID).pop()?.firstname.toUpperCase()
                let tutorLastname = getUsersMock("uuid", associations[i].tutorUUID).pop()?.lastname.toUpperCase()

                let supervisorFirstname = getUsersMock("uuid", associations[i].supervisorUUID).pop()?.firstname.toUpperCase()
                let supervisorLastname = getUsersMock("uuid", associations[i].supervisorUUID).pop()?.lastname.toUpperCase()

                if (studentFirstname?.includes(searched) || studentLastname?.includes(searched) ||
                    tutorFirstname?.includes(searched) || tutorLastname?.includes(searched) ||
                    supervisorFirstname?.includes(searched) || supervisorLastname?.includes(searched)
                ) {
                    newList.push(associations[i])
                }
            }
            return newList
        }
    }

    return (
        <div id={"ApprenticeshipManagement"}>
            <section className={"line w100 items-center space-between"}>
                <h3 className={"w50"}>Associations étudiant - tuteur - maître d'apprentissage</h3>
                <div className={"line w50 items-baseline space-between"}>
                    <input className={"w66"}
                           type={"text"}
                           name={'searchPostByName'}
                           placeholder={'Recherche par nom...'}
                           onChange={ e => setSearched(e.target.value) }
                    />
                    <Button className={"buttonWhite txtCenter"}
                            content={"+ Nouvelle association"} onclick={() => setShowModalCreation(!showModalCreation)}/>
                </div>
            </section>

            <Modal show={showModalCreation} onClose={() => setShowModalCreation(false)}>
                <ModalAssociationCreation/>
            </Modal>

            <ApprenticeshipManagementTable associations={getAssociationsBySearch(searched, associations)}/>
        </div>
    )
}

export default ApprenticeshipManagement
