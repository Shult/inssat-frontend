import {apiAcademy} from './client'

const getSectionById = (id) => apiAcademy.get(`/sections/${id}`)
const getAllSections = () => apiAcademy.get(`/sections`)

const createSection = (formData) => {
    return apiAcademy.post('/sections', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
      },
    })
  };

  const updateSection = (formData) => {
    return apiAcademy.put('/sections', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
      },
    })
  };
  
const deleteSection = (id) => {
return apiAcademy.delete(`/sections/${id}`, id, {
    headers: {
    'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
    },
})
};

export {
    getSectionById,
    getAllSections,
    createSection,
    updateSection,
    deleteSection
}