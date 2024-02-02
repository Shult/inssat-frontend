import {apiAcademy} from './client'



const getUsers = () => apiAcademy.get(`/users/`)
const getUsersByGroup = (group) => apiAcademy.get(`/groups/${group}/users`)
const getUserByUUID = (id) => apiAcademy.get(`/users/${id}`)

const postUser = (userData) => {
    return apiAcademy.post('/users', userData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
        },
    })
};

const putUser = (id, userData) => {
    return apiAcademy.put(`/users/${id}`, userData, {
        headers: {
            'Content-Type': 'application/json', // Ensure correct headers for form data
        },
    });
};

const deleteUser = (id) => {
    return apiAcademy.delete(`/users/${id}`, id, {
        headers: {
            'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
        },
    })
};


export {
    getUsers,
    getUsersByGroup,
    getUserByUUID,
    postUser,
    putUser,
    deleteUser,
}
