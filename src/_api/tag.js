import client from './client'

const getTags = () => client.get('/tags')
const getTagById = (id) => client.get(`/tags/${id}`) 

export {
    getTags, 
    getTagById
}
