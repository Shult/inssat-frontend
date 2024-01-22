import {
    getAssociations,
    getAssociationByStudentID,
    postAssociation,
    putAssociation,
    deleteAssociation,
} from "../../../_api/associationServices";
import {AssociationInterface} from "./Association.interface";
import {MutableRefObject} from "react";


// GETTER
const getAllAssociations = () => fetchAssociations()
const getAssociationByStudent = () => fetchAssociationByStudent()

async function fetchAssociations() {
    let associations : AssociationInterface[] = []
    const request = await getAssociations()
    if (request.ok){
        associations = request.data
    }
    return associations
}

async function fetchAssociationByStudent(){
    let association : AssociationInterface = { studentUUID: "", tutorUUID: "", supervisorUUID: ""}
    const request = await getAssociationByStudentID()
    if (request.ok){
        association = request.data
    }
    return association
}

// CRUD
const createAssociation = async (info : Array<string>) => {

    // 3 items required : student, tutor and supervisor IDs
    if (info.length === 3) {

        let association: AssociationInterface = { "studentUUID" : "", "tutorUUID" : "", "supervisorUUID" : "" }

        const student = info[0]
        const tutor = info[1]
        const supervisor = info[2]

        if (student !== null  && tutor !== null && supervisor !== null) {
            association.supervisorUUID = student
            association.tutorUUID = tutor
            association.supervisorUUID = supervisor
        }

        try {
            const response = await postAssociation(association);
            response.ok ? console.log('Created') : console.error('Failed', response.problem);
        }
        catch (error) { console.error('Error:', error) }
    }
    else { console.log('Association is invalid') }
}
const updateAssociation = async (info : Array<string>) => {

    // 3 items required : student, tutor and supervisor IDs
    if (info.length === 3) {

        const student = info[0]
        const tutor = info[1]
        const supervisor = info[2]

        let association: AssociationInterface = { "studentUUID" : student, "tutorUUID" : "", "supervisorUUID" : "" }

        if (tutor !== null && supervisor !== null) {
            association.tutorUUID = tutor
            association.supervisorUUID = supervisor
        }

        try {
            const response = await putAssociation(student, association);
            response.ok ? console.log('Created') : console.error('Failed', response.problem);
        }
        catch (error) { console.error('Error:', error) }
    }
    else { console.log('Association is invalid') }
    }
const removeAssociation = async (id: string) => await deleteAssociation(id)



export {
    getAssociations,
    getAssociationByStudent,
    createAssociation,
    updateAssociation,
    removeAssociation
}
