import {apiAcademy} from './client'

const getGradeById = (id) => apiAcademy.get(`/grades/${id}`)
const getAllGrades = () => apiAcademy.get(`/grades`)
const getGradesByUserId = (id) => apiAcademy.get(`/grades/tickets/${id}`)

export {
    getGradeById,
    getAllGrades,
    getGradesByUserId
}