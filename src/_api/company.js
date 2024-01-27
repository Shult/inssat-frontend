import {apiAcademy} from './client'

const getCompanyById = (id) => apiAcademy.get(`/companies/${id}`)
const getAllCompanies = () => apiAcademy.get(`/companies`)

export {
    getCompanyById,
    getAllCompanies
}
