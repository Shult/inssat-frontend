import { Level } from "../Services/activityReportInterfaces"
import { IPeriod, ISection,IImpression, IActivity, IGrade, IAssessment } from "../Services/activityReportInterfaces"

export const studentData1 = {
    id: 1,
    name: "Sylvain"
}
export const studentData2 = {
    id: 2,
    name: "Marie"
};



export const periodData1 : IPeriod = {
    id: 1,
    name: "Période entreprise 1",
    created_at: new Date(2022,1, 2, 3,4,5),
    updated_at: new Date(2023,1, 2, 3,4,5)
}
export const periodData2 : IPeriod = {
    id: 2,
    name: "Période entreprise 2",
    created_at: new Date(2022, 6, 15, 9, 45),
    updated_at: new Date(2023, 6, 15, 9, 45)
};



export const sectionData1 : ISection = {
    id: 1,
    title: "Bilan des compétences techniques",
    description: "null",
    created_at: new Date(2022,1, 2, 3,4,5),
    updated_at: new Date(2023,1, 2, 3,4,5)
}
export const sectionData2 : ISection = {
    id: 2,
    title: "Décomposer le problème, concevoir une solution",
    description: "Création d'interfaces utilisateur dynamiques",
    created_at: new Date(2022, 8, 25, 11, 15),
    updated_at: new Date(2023, 8, 25, 11, 15)
}



export const activityData1_1 : IActivity = {
    id: 1,
    name: "Analyser le cahier des charges, apprécier le contexte du système à développer",
    position: 1,
    is_delete: false,
    is_free: false,
    section_id: 1, // sectionData1
    created_at: new Date(2022,1, 2, 3,4,5),
    updated_at: new Date(2023,1, 2, 3,4,5)
}
export const activityData1_2 : IActivity = {
    id: 2,
    name: "Décomposer le problème, concevoir une solution",
    position: 2,
    is_delete: false,
    is_free: false,
    section_id: 1, // sectionData1
    created_at: new Date(2022,1, 2, 3,4,5),
    updated_at: new Date(2023,1, 2, 3,4,5)
}
export const activityData2_1 : IActivity = {
    id: 2,
    name: "Concevoir et développer des composants d'interface utilisateur",
    position: 2,
    is_delete: false,
    is_free: true,
    section_id: 2,
    created_at: new Date(2022, 7, 20, 10, 0),
    updated_at: new Date(2023, 7, 20, 10, 0)
};



export const impressionData1_1 : IImpression = {
    id: 1,
    content: "",
    level_id: Level.EXCELLENT,
    activity_id: 1, // activityData1_1
    student_id: 1,
    period_id: 1,
    created_at: new Date(2022,1, 2, 3,4,5),
    updated_at: new Date(2023,1, 2, 3,4,5)
}
export const impressionData1_2 : IImpression = {
    id: 2,
    content: "",
    level_id: Level.EXCELLENT,
    activity_id: 2, // activityData1_2
    student_id: 1,
    period_id: 1,
    created_at: new Date(2022,1, 2, 3,4,5),
    updated_at: new Date(2023,1, 2, 3,4,5)
}
export const impressionData2_1 : IImpression = {
    id: 3,
    content: "Travail exceptionnel sur le projet",
    level_id: Level.EXCELLENT,
    activity_id: 3,
    student_id: 1,
    period_id: 1,
    created_at: new Date(2022, 5, 10, 8, 30),
    updated_at: new Date(2023, 5, 10, 8, 30)
};




export const gradeData1 : IGrade = {
    id: 1,
    grade: 18,
    student_id: 1,
    assessment_id: 1,
    period_id: 1,
    comment: "Excellente performance",
    created_at: new Date(2022, 9, 30, 12, 30),
    updated_at: new Date(2023, 9, 30, 12, 30)
};
export const gradeData2 : IGrade = {
    id: 2,
    grade: 12,
    student_id: 1,
    assessment_id: 2,
    period_id: 1,
    comment: "Moyen moyen",
    created_at: new Date(2022, 9, 30, 12, 30),
    updated_at: new Date(2023, 9, 30, 12, 30)
};
export const gradeData3 : IGrade = {
    id: 3,
    grade: 19,
    student_id: 1,
    assessment_id: 3,
    period_id: 1,
    comment: "Excellent",
    created_at: new Date(2022, 9, 30, 12, 30),
    updated_at: new Date(2023, 9, 30, 12, 30)
};



export const assessmentData1 : IAssessment = {
    id: 1,
    name: "Travail réalisé",
    coefficient: 6,
    column_6: 1,
    created_at: new Date(2022, 9, 30, 12, 30),
    updated_at: new Date(2023, 9, 30, 12, 30)
}
export const assessmentData2 : IAssessment = {
    id: 2,
    name: "Rapport",
    coefficient: 2,
    column_6: 1,
    created_at: new Date(2022, 9, 30, 12, 30),
    updated_at: new Date(2023, 9, 30, 12, 30)
}
export const assessmentData3 : IAssessment = {
    id: 3,
    name: "Soutenance",
    coefficient: 1,
    column_6: 1,
    created_at: new Date(2022, 9, 30, 12, 30),
    updated_at: new Date(2023, 9, 30, 12, 30)
}






const activityReportData = {
    impressions: [impressionData1_1, impressionData1_2, impressionData2_1],
    periods: [periodData1, periodData2],
    activities: [activityData1_1, activityData1_2, activityData2_1],
    sections: [sectionData1, sectionData2],
    grades: [gradeData1, gradeData2, gradeData3],
    assessments: [assessmentData1, assessmentData2, assessmentData3],
    students: [studentData1, studentData2]
}
export default activityReportData