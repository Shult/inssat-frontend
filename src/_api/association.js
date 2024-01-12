import client from './client'

const getAssociations = () => client.get(`/associations/`)
const getAssociationByStudentID = (id) => client.get(`/associations/${id}`)

const createAssociation = (formData) => {
    return client.post('/associations', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
        },
    })
};

const updateAssociation = (id, associationData) => {
    return client.put(`/associations/${id}`, associationData, {
        headers: {
            'Content-Type': 'application/json', // Ensure correct headers for form data
        },
    });
};

const deleteAssociation = (id) => {
    return client.delete(`/associations/${id}`, id, {
        headers: {
            'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
        },
    })
};


export {
    getAssociations,
    getAssociationByStudentID,
    createAssociation,
    updateAssociation,
    deleteAssociation,
}
