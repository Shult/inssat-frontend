import {apiAcademy} from './client'

const getCompanyById = (id) => apiAcademy.get(`/companies/${id}`)
const getAllCompanies = () => apiAcademy.get(`/companies`)
const getCompanyByIdUsers = (id) => apiAcademy.get(`/companies/${id}/users`)

const createCompany = (formData) => {
    return apiAcademy.post('/companies', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
      },
    })
  };

  const updateCompany = (formData) => {
    return apiAcademy.put('/companies', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
      },
    })
  };
  
const deleteCompany = (id) => {
return apiAcademy.delete(`/companies/${id}`, id, {
    headers: {
    'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
    },
})
};


export {
    getCompanyById,
    getAllCompanies,
    getCompanyByIdUsers,
    createCompany,
    updateCompany,
    deleteCompany
}
