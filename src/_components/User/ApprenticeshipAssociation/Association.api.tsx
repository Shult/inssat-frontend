import {AssociationInterface} from "./Association.interface";
import {MutableRefObject} from "react";

/*
 * Mock functions
 */

function getAssociationsMock(student?: string, tutor?: string, supervisor?: string){
    let associations: AssociationInterface[] = associationMock
    let newList: AssociationInterface[] = []

    let i = 0;
    if (student){
        while ( i < associations.length && associations[i].studentUUID !== student) {
            if (associations[i].studentUUID === student) {
                newList.push(associations[i])
            }
        }
        i++
    }

async function fetchAssociationByStudent(){
    let association : AssociationInterface = { studentUUID: "", tutorUUID: "", supervisorUUID: ""}
    const request = await getAssociationByStudentID()
    if (request.ok){
        association = request.data
    }
    return association
}

    i = 0;
    if (supervisor){
        while ( i < associations.length && associations[i].supervisorUUID !== supervisor) {
            if (associations[i].supervisorUUID === supervisor) {
                newList.push(associations[i])
            }
        }
        i++
    }

    return newList.length > 0 ? newList : associations
}
// function createAssociationMock(student: UserInterface, tutor: UserInterface, supervisor: UserInterface){
function createAssociationMock(student: string, tutor: string, supervisor: string){

        let association: AssociationInterface = { "studentUUID" : "", "tutorUUID" : "", "supervisorUUID" : "" }

    // console.log(student, tutor, supervisor)

        if (student !== null  && tutor !== null && supervisor !== null) {
            association.supervisorUUID = student
            association.tutorUUID = tutor
            association.supervisorUUID = supervisor
        }

    if (!found){
        console.log("creating new association...")
        associationMock.push({studentUUID: student, tutorUUID: tutor, supervisorUUID: supervisor})
    }
}


function updateAssociationMock(student: string, tutor: string, supervisor: string){
    let associations: AssociationInterface[] = associationMock
    let i = 0
    let found = false

    // console.log(student, tutor, supervisor)

    while ( i < associations.length && !found) {
        console.log("looking for association...")
        associations[i].studentUUID === student ? found = true :  i++
    }

    if (found){
        console.log("updating association...")

        if (associations[i].tutorUUID !== tutor) {
            associations[i].tutorUUID = tutor
        }
        if (associations[i].supervisorUUID !== supervisor) {
            associations[i].supervisorUUID = supervisor
        }
    }
}


function deleteAssociationMock(student: string){
    let associations: AssociationInterface[] = associationMock
    let i = 0
    let found = false

    // console.log(student, tutor, supervisor)

        let association: AssociationInterface = { "studentUUID" : student, "tutorUUID" : "", "supervisorUUID" : "" }

        if (tutor !== null && supervisor !== null) {
            association.tutorUUID = tutor
            association.supervisorUUID = supervisor
        }

/*
 * Database functions
 */

const getAssociations = (key?: string, value?: any) => fetchAssociations(key, value)

async function fetchAssociations (key?: string, value?: any): Promise<AssociationInterface[]> {
    const response = await fetchAssociationsDB(key, value)
    return response.data as AssociationInterface[]
}

const fetchAssociationsDB = (key?: string, value?: any) => key? apiBlog.get(`/associations/details/${value}`) : apiBlog.get(`/associations/details`)

const createAssociation = (formData: any) => {
    return apiBlog.post('/associations', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
}

const updateAssociation = (id: string, formData: any) => {
    return apiBlog.put(`/associations/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
}

const deleteAssociation = (id: string) => {
    return apiBlog.delete(`/associations/${id}`, id, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
}


export {
    getAssociations,
    getAssociationByStudent,
    createAssociation,
    updateAssociation,
    deleteAssociation
}
