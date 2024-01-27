import {apiAcademy} from './client'


const getAllStudentMaTutors = () => apiAcademy.get(`/student-ma-tutors`)

const createStudentMaTutor = (formData) => {
    return apiAcademy.post('/student-ma-tutors', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
      },
    })
  };

  const updateStudentMaTutor = (formData) => {
    return apiAcademy.put('/student-ma-tutors', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
      },
    })
  };
  
const deleteStudentMaTutor = (id) => {
return apiAcademy.delete(`/student-ma-tutors/${id}`, id, {
    headers: {
    'Content-Type': 'multipart/form-data', // Ensure correct headers for form data
    },
})
};

const getStudentsAndMAByTutorId = (tutorId) => apiAcademy.get(`/student-ma-tutors/tutor/${tutorId}`)

const getStudentsAndTutorByMAId = (maId) => apiAcademy.get(`/student-ma-tutors/ma/${maId}`)

export {
    getAllStudentMaTutors,
    createStudentMaTutor,
    updateStudentMaTutor,
    deleteStudentMaTutor,
    getStudentsAndMAByTutorId,
    getStudentsAndTutorByMAId
}