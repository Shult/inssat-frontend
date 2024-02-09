import { apiBlog } from "./client"

const getTags = () => apiBlog.get('/tags')
const getTagById = (id) => apiBlog.get(`/tags/${id}`) 

export {
    getTags, 
    getTagById
}
