import {apiAcademy} from './client'


const getAllStudentMaTutors = () => apiAcademy.get(`/student-ma-tutors`)

export {
    getAllStudentMaTutors
}