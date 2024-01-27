import {apiAcademy} from './client'

const getGradeById = (id) => apiAcademy.get(`/grades/${id}`)
const getAllGrades = () => apiAcademy.get(`/grades`)

export {
    getGradeById,
    getAllGrades
}