import {apiAcademy} from "./client";

const getAssociations = () => apiAcademy.get(`/student-ma-tutors/`)
const getAssociationByStudentID = (id) => apiAcademy.get(`/student-ma-tutors/${id}`)

const postAssociation = (associationData) => {
    return apiAcademy.post('/student-ma-tutors', associationData, {
        headers: {
            'Content-Type': 'application/json', // Ensure correct headers for form data
        },
    })
};

const putAssociation = (id, associationData) => {
    return apiAcademy.put(`/student-ma-tutors/${id}`, associationData, {
        headers: {
            'Content-Type': 'application/json', // Ensure correct headers for form data
        },
    });
};

const deleteAssociation = (id) => {
    return apiAcademy.delete(`/student-ma-tutors/${id}`, id, {
        headers: {
            'Content-Type': 'application/json', // Ensure correct headers for form data
        },
    })
};


export {
    getAssociations,
    getAssociationByStudentID,
    postAssociation,
    putAssociation,
    deleteAssociation,
}
