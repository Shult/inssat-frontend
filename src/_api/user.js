import { apiAcademy } from "./client";

const getUserAll = () => apiAcademy.get(`/users`)

const getUserById = (id) => apiAcademy.get(`/users/${id}`)

const getSuivi = (id) => apiAcademy.get(`/users/${id}/suivi`)

const getGradesByPk = (id) => apiAcademy.get(`/users/${id}/grades`)

const getByPkPeriod = (id, periodId) => apiAcademy.get(`/users/${id}/grades/${periodId}`)

export {
    getUserAll,
    getUserById,
    getSuivi,
    getGradesByPk,
    getByPkPeriod
}

