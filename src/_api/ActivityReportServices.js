import {apiAcademy} from './client';

const getSections = () => {
    return apiAcademy.get('/sections');
};

const getSectionsWithActivities = () => {
    return apiAcademy.get('/activities/groupedBySection');
};

const getSectionsWithActivitiesAndImpressionsByPeriodAndUserId = (periodId, userId) => {
    return apiAcademy.get(`/activities/sectionsAndImpressions?periodId=${periodId}&userId=${userId}`);
};

const getPeriods = () => {
    return apiAcademy.get('/periods');
};

const getImpressions = () => {
    return apiAcademy.get('/impressions');
};

const postImpression = (formData) => {
    // console.log("postImpression");
    return apiAcademy.post('/impressions/', formData);
};

const updateImpression = (impressionId, impressionData) => {
    // console.log("putImpression");
    return apiAcademy.put(`/impressions/${impressionId}`, impressionData);
};

const getGrades = () => {
    return apiAcademy.get('/grades');
};

const postGrade = (formData) => {
    return apiAcademy.post('/grades/', formData);
};

const updateGrade = (impressionId, impressionData) => {
    console.log("putImpression");
    return apiAcademy.put(`/grades/${impressionId}`, impressionData);
};

const getLevels = () => {
    return apiAcademy.get('/levels');
};

const getAssessments = () => {
    return apiAcademy.get('/assessments');
};

export {
    getSectionsWithActivitiesAndImpressionsByPeriodAndUserId,
    getSections,
    getSectionsWithActivities,

    getPeriods,

    getImpressions,
    postImpression,
    updateImpression,

    getAssessments,

    getGrades,
    postGrade,
    updateGrade,

    getLevels
    // Exportez les autres fonctions ici
};
