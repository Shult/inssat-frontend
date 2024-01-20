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

const getImpressions = () => {
    return apiClientAcademy.get('/impressions');
};

const postImpression = (formData) => {
    return apiClientAcademy.post('/impressions/', formData);
};

const getGrades = () => {
    return apiClientAcademy.get('/grades');
};

const postGrade = (formData) => {
    return apiClientAcademy.post('/grades/', formData);
};

const getLevels = () => {
    return apiClientAcademy.get('/levels');
};

export {
    getSections,
    getSectionsWithActivities,

    getPeriods,

    getImpressions,
    postImpression,

    getGrades,
    postGrade,

    getLevels
    // Exportez les autres fonctions ici
};
