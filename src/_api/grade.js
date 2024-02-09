import {apiAcademy} from './client'

const getGradeById = (id) => apiAcademy.get(`/grades/${id}`)
const getAllGrades = () => apiAcademy.get(`/grades`)

const createGrade = (formData) => {
    return apiAcademy.post('/grades', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
      },
    })
  };

  const updateGrade = (formData) => {
    return apiAcademy.put('/grades', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
      },
    })
  };
  
const deleteGrade = (id) => {
return apiAcademy.delete(`/grades/${id}`, id, {
    headers: {
    'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
    },
})
};



export {
    getGradeById,
    getAllGrades,
    createGrade,
    deleteGrade,
    updateGrade
}