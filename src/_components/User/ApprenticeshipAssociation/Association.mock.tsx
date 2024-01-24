import {AssociationInterface} from "./Association.interface";
import client from "../../../_api/client";
import {associationMock} from "../User.mock";

/*
 * Mock functions
 */

function getAssociationsMock(student?: string, tutor?: string, supervisor?: string){
    let associations: AssociationInterface[] = associationMock
    let newList: AssociationInterface[] = []

    let i = 0;
    if (student){
        while ( i < associations.length && associations[i].student_id !== student) {
            if (associations[i].student_id === student) {
                newList.push(associations[i])
            }
        }
        i++
    }

    i = 0;
    if (tutor){
        while ( i < associations.length && associations[i].tutor_id !== tutor) {
            if (associations[i].tutor_id === tutor) {
                newList.push(associations[i])
            }
        }
        i++
    }

    i = 0;
    if (supervisor){
        while ( i < associations.length && associations[i].ma_id !== supervisor) {
            if (associations[i].ma_id === supervisor) {
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

    // console.log(student, tutor, supervisor)

    while ( i < associations.length && !found) {
        console.log("looking for association...")
        associations[i].student_id === student ? found = true : i++
    }

    if (!found){
        console.log("creating new association...")
        associationMock.push({student_id: student, tutor_id: tutor, ma_id: supervisor})
    }
}


function updateAssociationMock(student: string, tutor: string, supervisor: string){
    let associations: AssociationInterface[] = associationMock
    let i = 0
    let found = false

    // console.log(student, tutor, supervisor)

    while ( i < associations.length && !found) {
        console.log("looking for association...")
        associations[i].student_id === student ? found = true :  i++
    }

    if (found){
        console.log("updating association...")

        if (associations[i].tutor_id !== tutor) {
            associations[i].tutor_id = tutor
        }
        if (associations[i].ma_id !== supervisor) {
            associations[i].ma_id = supervisor
        }
    }
}


function deleteAssociationMock(student: string){
    let associations: AssociationInterface[] = associationMock
    let i = 0
    let found = false

    // console.log(student, tutor, supervisor)

    while ( i < associations.length && !found) {
        console.log("looking for association...")
        associations[i].student_id === student ? found = true :  i++
    }

    if (found) {
        console.log("deleting association...")
        associationMock.splice(i, 1)
    }
}
export {
    // Mock
    getAssociationsMock,
    createAssociationMock,
    updateAssociationMock,
    deleteAssociationMock,
}
