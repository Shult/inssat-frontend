import {AssociationInterface} from "./Association.interface";
import client from "../../../_api/client";
import {associationMock, usersMock} from "../User.mock";
import {getUsersMock} from "../User.api";
import {UserInterface} from "../User.interface";

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

    i = 0;
    if (tutor){
        while ( i < associations.length && associations[i].tutorUUID !== tutor) {
            if (associations[i].tutorUUID === tutor) {
                newList.push(associations[i])
            }
        }
        i++
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

    let associations: AssociationInterface[] = associationMock
    let i = 0
    let found = false

    console.log(student, tutor, supervisor)

    while ( i < associations.length && !found) {
        console.log("looking for association...")
        associations[i].studentUUID === student ? found = true : i++
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

    while ( i < associations.length && !found) {
        associations[i].studentUUID === student ? found = true :  i++
    }

    if (found){
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

    while ( i < associations.length && !found) {
        associations[i].studentUUID === student ? found = true :  i++
    }

    if (found) { associationMock.splice(i, 1) }
}

/*
 * Database functions
 */

const getAssociations = (key?: string, value?: any) => fetchAssociations(key, value)

async function fetchAssociations (key?: string, value?: any): Promise<AssociationInterface[]> {
    const response = await fetchAssociationsDB(key, value)
    return response.data as AssociationInterface[]
}

const fetchAssociationsDB = (key?: string, value?: any) => key? client.get(`/associations/details/${value}`) : client.get(`/associations/details`)

const createAssociation = (formData: any) => {
    return client.post('/associations', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
}

const updateAssociation = (id: string, formData: any) => {
    return client.put(`/associations/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
}

const deleteAssociation = (id: string) => {
    return client.delete(`/associations/${id}`, id, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
}


export {
    // Mock
    getAssociationsMock,
    createAssociationMock,
    updateAssociationMock,
    deleteAssociationMock,

    // Database
    getAssociations,
    createAssociation,
    updateAssociation,
    deleteAssociation
}
