import apiClientAcademy from './clientAcademy';

const getSections = () => {
    return apiClientAcademy.get('/sections');
};

const getSectionsWithActivities = () => {
    return apiClientAcademy.get('/activities/groupedBySection');
};
// Ajoutez d'autres fonctions si nécessaire

const getPeriods = () => {
    return apiClientAcademy.get('/periods');
};

const postImpression = (formData) => {
    return apiClientAcademy.post('/impressions/', formData);
};

const postGrade = (formData) => {
    return apiClientAcademy.post('/grades/', formData);
};

export {
    getSections,
    getSectionsWithActivities,
    getPeriods,
    postImpression,
    postGrade
    // Exportez les autres fonctions ici
};
