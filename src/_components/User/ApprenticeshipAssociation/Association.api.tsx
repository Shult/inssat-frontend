import {
    getAssociations,
    getAssociationByStudentID,
    createAssociation,
    updateAssociation,
    deleteAssociation,
} from "../../../_api/association";
import {AssociationInterface} from "./Association.interface";
import client from "../../../_api/client";
import {createArticle} from "../../../_api/article";
import {useRef} from "react";


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
const newAssociation = () => {
    if (form.checkValidity()) {
        const formData = new FormData();

        formData.append('studentUUID', document.querySelector('input[id="select-student"]')?.nodeValue)
        formData.append('tutorUUID', document.querySelector('input[id="select-tutor"]')?.nodeValue)
        formData.append('supervisorUUID', document.querySelector('input[id="select-supervisor"]')?.nodeValue)

        try {
            const response = await createAssociation(formData);
            response.ok ? console.log('Created') : console.error('Failed', response.problem);
        }
        catch (error) { console.error('Error:', error) }
    } else { console.log('Form is invalid') }
}
const modifyAssociation = () => updateAssociation()
const removeAssociation = () => deleteAssociation()



export {
    getAssociations,
    getAssociationByStudent,
    newAssociation,
    modifyAssociation,
    removeAssociation
}
