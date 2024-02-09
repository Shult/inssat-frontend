import {apiAcademy} from './client'

const getPeriodById = (id) => apiAcademy.get(`/periods/${id}`)
const getAllPeriods = () => apiAcademy.get(`/periods`)

const createPeriod = (formData) => {
    return apiAcademy.post('/periods', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
      },
    })
  };

  const updatePeriod = (formData) => {
    return apiAcademy.put('/periods', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
      },
    })
  };
  
const deletePeriod = (id) => {
return apiAcademy.delete(`/periods/${id}`, id, {
    headers: {
    'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
    },
})
};

export {
    getPeriodById,
    getAllPeriods,
    createPeriod,
    updatePeriod,
    deletePeriod
}
