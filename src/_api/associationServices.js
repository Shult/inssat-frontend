import apiClientAssociation from './associationClient'

const getAssociations = () => apiClientAssociation.get(`/student-ma-tutors/`)
const getAssociationByStudentID = (id) => apiClientAssociation.get(`/student-ma-tutors/${id}`)

const postAssociation = (associationData) => {
    return apiClientAssociation.post('/student-ma-tutors', associationData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
        },
    })
};

const putAssociation = (id, associationData) => {
    return apiClientAssociation.put(`/student-ma-tutors/${id}`, associationData, {
        headers: {
            'Content-Type': 'application/json', // Ensure correct headers for form data
        },
    });
};

const deleteAssociation = (id) => {
    return apiClientAssociation.delete(`/student-ma-tutors/${id}`, id, {
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
