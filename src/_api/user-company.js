import {apiAcademy} from './client'

const getUserCompanyById = (id) => apiAcademy.get(`/user-company/${id}`)
const getAllUserCompanies = () => apiAcademy.get(`/user-company`)

const getAllUserCompaniesWithDetails = () => apiAcademy.get(`/user-company/details`)
const getUserCompanyByIdWithDetails = (id) => apiAcademy.get(`/user-company/${id}/details`)


const createUserCompany = (formData) => {
    return apiAcademy.post('/user-company', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
      },
    })
  };

  const updateUserCompany = (formData) => {
    return apiAcademy.put('/user-company', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
      },
    })
  };
  
const deleteUserCompany = (id) => {
return apiAcademy.delete(`/user-company/${id}`, id, {
    headers: {
    'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
    },
})
};

export {
    getUserCompanyById,
    getAllUserCompanies,
    getAllUserCompaniesWithDetails,
    getUserCompanyByIdWithDetails,
    createUserCompany,
    updateUserCompany,
    deleteUserCompany
}