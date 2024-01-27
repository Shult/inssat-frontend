import {apiAcademy} from './client'

const getAssessmentById = (id) => apiAcademy.get(`/assessments/${id}`)
const getAllAssessments = () => apiAcademy.get(`/assessments`)

export {
    getAssessmentById,
    getAllAssessments
}