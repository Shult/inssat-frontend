import React, {useEffect, useState} from "react";
import Modal from "../../_components/Modal/Modal";

import Button from "../../_components/Clickable/Button";
import ApprenticeshipManagementTable from "./Table/ApprenticeshipManagement.table";
import ModalAssociationCreation from "./Modal/ApprenticeshipManagement.modal.create";

import {AssociationInterface} from "../../_components/User/ApprenticeshipAssociation/Association.interface";

import "./ApprenticeshipManagement.css"

import {getUserByID} from "../../_components/User/User.api";
import {UserInterface} from "../../_components/User/User.interface";
import {getAllAssociations} from "../../_components/User/ApprenticeshipAssociation/Association.api";
import {getUsersByGroup} from "../../_api/userServices";
import {GROUP_ID_STUDENT, GROUP_ID_SUPERVISOR, GROUP_ID_TUTOR} from "../../_helpers/constantes";

const ApprenticeshipManagement = () => {


    const [showModalCreation, setShowModalCreation] = useState(false);
    const [searched, setSearched] = useState("");

    const [associations, setAssociation] = useState<any>([])

    const [students, setStudentList] = useState<UserInterface[]>([])
    const [tutors, setTutorList] = useState<UserInterface[]>([])
    const [supervisors, setSupervisorList] = useState<UserInterface[]>([])

    const [searchedStudent, setStudent] = useState<UserInterface | null>(null)
    const [searchedTutor, setTutor] = useState<UserInterface | null>(null)
    const [searchedSupervisor, setSupervisor] = useState<UserInterface | null>(null)

    useEffect(() => {
        getAllAssociations().then((result: any) => setAssociation(result))

        getUsersByGroup(GROUP_ID_STUDENT).then( (result: any) => setStudentList(result.data))
        getUsersByGroup(GROUP_ID_TUTOR).then( (result: any) => setTutorList(result.data))
        getUsersByGroup(GROUP_ID_SUPERVISOR).then( (result: any) => setSupervisorList(result.data))

    }, []);


    function getAssociationsBySearch(searched: string, associations: AssociationInterface[]){
        if (searched.length < 2){ return associations }
        else {
            let newList = []
            searched = searched.toUpperCase()
            for (let i = 0; i < associations.length; i++) {

                // From ID in association to all user information
                getUserByID(associations[i].student_id).then((result: any) => setStudent(result))
                getUserByID(associations[i].tutor_id).then((result: any) => setTutor(result))
                getUserByID(associations[i].ma_id).then((result: any) => setSupervisor(result))

                // Split information for treatment
                let studentFirstname = searchedStudent?.firstname.toUpperCase()
                let studentLastname = searchedStudent?.lastname.toUpperCase()
                let tutorFirstname = searchedTutor?.firstname.toUpperCase()
                let tutorLastname = searchedTutor?.lastname.toUpperCase()
                let supervisorFirstname = searchedSupervisor?.firstname.toUpperCase()
                let supervisorLastname = searchedSupervisor?.lastname.toUpperCase()

                // If one of the pieces match the search, add it to newList
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
                            content={"+ Nouvelle association"}
                            onclick={() => setShowModalCreation(!showModalCreation)}/>
                </div>
            </section>

            <Modal show={showModalCreation} onClose={() => setShowModalCreation(false)}>
                <ModalAssociationCreation onValidate={() => setShowModalCreation(false)}
                                          show={showModalCreation}
                />
            </Modal>

            <ApprenticeshipManagementTable associations={getAssociationsBySearch(searched, associations)}
                                           students={students}
                                           tutors={tutors}
                                           supervisors={supervisors}
            />
        </div>
    )
}

export default ApprenticeshipManagement
