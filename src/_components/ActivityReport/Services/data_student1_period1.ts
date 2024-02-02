import { Level } from "../Services/activityReportInterfaces"
import { IPeriod, ISection,IImpression, IActivity, IGrade, IAssessment } from "../Services/activityReportInterfaces"

export const studentData1 = {
    id: 1,
    name: "Sylvain"
}

// export const periodData1 : IPeriod = {
//     id: 1,
//     name: "Période entreprise 1",
//     created_at: new Date(2022,1, 2, 3,4,5),
//     updated_at: new Date(2023,1, 2, 3,4,5)
// }

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
    id: 3,
    name: "Élément satisfaisants",
    position: 1,
    is_delete: false,
    is_free: true,
    section_id: 2,
    created_at: new Date(2022, 7, 20, 10, 0),
    updated_at: new Date(2023, 7, 20, 10, 0)
};
export const activityData2_2 : IActivity = {
    id: 4,
    name: "Élément perfectibles",
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
    level_id: Level.INSUFFICIENT,
    activity_id: 2, // activityData1_2
    student_id: 1,
    period_id: 1,
    created_at: new Date(2022,1, 2, 3,4,5),
    updated_at: new Date(2023,1, 2, 3,4,5)
}
export const impressionData2_1 : IImpression = {
    id: 3,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    level_id: Level.EXCELLENT,
    activity_id: 3,
    student_id: 1,
    period_id: 1,
    created_at: new Date(2022, 5, 10, 8, 30),
    updated_at: new Date(2023, 5, 10, 8, 30)
};

export const impressionData2_2 : IImpression = {
    id: 4,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    level_id: Level.EXCELLENT,
    activity_id: 4,
    student_id: 1,
    period_id: 1,
    created_at: new Date(2022, 5, 10, 8, 30),
    updated_at: new Date(2023, 5, 10, 8, 30)
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
export const gradeData1 : IGrade = {
    id: 1,
    grade: 18,
    student_id: "1",
    assessment_id: 1,
    period_id: 1,
    comment: "Excellente performance",
    // created_at: new Date(2022, 9, 30, 12, 30),
    // updated_at: new Date(2023, 9, 30, 12, 30)
};
export const gradeData2 : IGrade = {
    id: 2,
    grade: 12,
    student_id: "1",
    assessment_id: 2,
    period_id: 1,
    comment: "Moyen moyen",
    // created_at: new Date(2022, 9, 30, 12, 30),
    // updated_at: new Date(2023, 9, 30, 12, 30)
};
export const gradeData3 : IGrade = {
    id: 3,
    grade: 19,
    student_id: "1",
    assessment_id: 3,
    period_id: 1,
    comment: "Excellent",
    // created_at: new Date(2022, 9, 30, 12, 30),
    // updated_at: new Date(2023, 9, 30, 12, 30)
};

const student1_period1 = {
    student: studentData1,
    // period: periodData1,
    sections: [sectionData1, sectionData2],

    activities: [activityData1_1, activityData1_2, activityData2_1, activityData2_2],
    impressions: [impressionData1_1, impressionData1_2, impressionData2_1, impressionData2_2],

    assessments: [assessmentData1, assessmentData2, assessmentData3],
    grades: [gradeData1, gradeData2, gradeData3]
}

export default student1_period1