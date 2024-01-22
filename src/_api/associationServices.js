import apiClientAssociation from './associationClient'

const getAssociations = () => apiClientAssociation.get(`/associations/`)
const getAssociationByStudentID = (id) => apiClientAssociation.get(`/associations/${id}`)

const postAssociation = (associationData) => {
    return apiClientAssociation.post('/associations', associationData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
        },
    })
};

const putAssociation = (id, associationData) => {
    return apiClientAssociation.put(`/associations/${id}`, associationData, {
        headers: {
            'Content-Type': 'application/json', // Ensure correct headers for form data
        },
    });
};

const deleteAssociation = (id) => {
    return apiClientAssociation.delete(`/associations/${id}`, id, {
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
