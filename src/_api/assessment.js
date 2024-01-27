import {apiAcademy} from './client'

const getAssessmentById = (id) => apiAcademy.get(`/assessments/${id}`)

const getAllAssessments = () => apiAcademy.get(`/assessments`)

const createAssessment = (formData) => {
    return apiAcademy.post('/assessments', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
      },
    })
  };

  const updateAssessment = (formData) => {
    return apiAcademy.put('/assessments', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
      },
    })
  };
  
const deleteAssessment = (id) => {
return apiAcademy.delete(`/assessments/${id}`, id, {
    headers: {
    'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
    },
})
};

export {
    getAssessmentById,
    getAllAssessments,
    createAssessment,
    updateAssessment,
    deleteAssessment
}