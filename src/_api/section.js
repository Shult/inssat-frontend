import {apiAcademy} from './client'

const getSectionById = (id) => apiAcademy.get(`/sections/${id}`)
const getAllSections = () => apiAcademy.get(`/sections`)

export {
    getSectionById,
    getAllSections
}