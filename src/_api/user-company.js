import {apiAcademy} from './client'

const getUserCompanyById = (id) => apiAcademy.get(`/user-company/${id}`)
const getAllUserCompanies = () => apiAcademy.get(`/user-company`)

export {
    getUserCompanyById,
    getAllUserCompanies
}