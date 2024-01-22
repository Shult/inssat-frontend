import apiClientUser from './userClient'



const getUsers = () => apiClientUser.get(`/users/`)
const getUserByUUID = (id) => apiClientUser.get(`/users/${id}`)

const postUser = (userData) => {
    return apiClientUser.post('/users', userData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
        },
    })
};

const putUser = (id, userData) => {
    return apiClientUser.put(`/users/${id}`, userData, {
        headers: {
            'Content-Type': 'application/json', // Ensure correct headers for form data
        },
    });
};

const deleteUser = (id) => {
    return apiClientUser.delete(`/users/${id}`, id, {
        headers: {
            'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
        },
    })
};


export {
    getUsers,
    getUserByUUID,
    postUser,
    putUser,
    deleteUser,
}
