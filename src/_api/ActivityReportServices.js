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
    console.log("postImpression");
    return apiClientAcademy.post('/impressions/', formData);
};

const updateImpression = (impressionId, impressionData) => {
    console.log("putImpression");
    return apiClientAcademy.put(`/impressions/${impressionId}`, impressionData);
};

const getGrades = () => {
    return apiClientAcademy.get('/grades');
};

const postGrade = (formData) => {
    return apiClientAcademy.post('/grades/', formData);
};

const updateGrade = (impressionId, impressionData) => {
    console.log("putImpression");
    return apiClientAcademy.put(`/impressions/${impressionId}`, impressionData);
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
    updateImpression,

    getGrades,
    postGrade,
    updateGrade,

    getLevels
    // Exportez les autres fonctions ici
};
