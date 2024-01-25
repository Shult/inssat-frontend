import apiClientAcademy from "./clientAcademy";

const getAssociations = () => apiClientAcademy.get(`/student-ma-tutors/`)
const getAssociationByStudentID = (id) => apiClientAcademy.get(`/student-ma-tutors/${id}`)

const postAssociation = (associationData) => {
    return apiClientAcademy.post('/student-ma-tutors', associationData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
        },
    })
};

const putAssociation = (id, associationData) => {
    return apiClientAcademy.put(`/student-ma-tutors/${id}`, associationData, {
        headers: {
            'Content-Type': 'application/json', // Ensure correct headers for form data
        },
    });
};

const deleteAssociation = (id) => {
    return apiClientAcademy.delete(`/student-ma-tutors/${id}`, id, {
        headers: {
            'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
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
