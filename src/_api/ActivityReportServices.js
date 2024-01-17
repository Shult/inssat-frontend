import apiClientAcademy from './clientAcademy';

const getSections = () => {
    return apiClientAcademy.get('/sections');
};

const getSectionsWithActivities = () => {
    return apiClientAcademy.get('/activities/groupedBySection');
};
// Ajoutez d'autres fonctions si nécessaire


export {
    getSections,
    getSectionsWithActivities
    // Exportez les autres fonctions ici
};
