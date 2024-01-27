import {apiAcademy} from './client'

const getPeriodById = (id) => apiAcademy.get(`/periods/${id}`)
const getAllPeriods = () => apiAcademy.get(`/periods`)

export {
    getPeriodById,
    getAllPeriods
}
