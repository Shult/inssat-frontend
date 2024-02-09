export interface UserAttribute {
    name: string;
    value: string;
}
export interface Activity {
    id: number;
    name: string;
    position: number;
    is_delete: boolean;
    is_free: boolean;
    section_id: number;
    createdAt: string;
    updatedAt: string;
    section: Section;
    impressions: Impression[];
}

export interface Section {
    id: number;
    title: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    activities: Activity[];
}

export interface Level {
    id: number;
    name: string;
    position: number;
    createdAt: string;
    updatedAt: string;
}

export interface Period {
    id: number;
    name: string;
    description: string;
    number: number;
    createdAt: string;
    updatedAt: string;
}

export interface Impression {
    id: number;
    content: string;
    level_id: number;
    activity_id: number;
    period_id: number;
    student_id: string;
    createdAt: string;
    updatedAt: string;
    activity: Activity;
    level: Level;
    period: Period;
}

export interface Assessment {
    id: number;
    name: string;
    coefficient: number;
    position: number;
    createdAt: string;
    updatedAt: string;
    grades: Grade;
}

export interface Grade {
    id: number;
    student_id: string;
    grade: number;
    assessment_id: number;
    period_id: number;
    comment: string;
    section_id: number;
    createdAt: string;
    updatedAt: string;
    assessment: Assessment;
    period: Period;
    section: Section;
}

export interface UserData {
    ID: string;
    USERNAME: string;
    FIRST_NAME: string;
    LAST_NAME: string;
    EMAIL: string;
    USER_ATTRIBUTES: UserAttribute[];
    grades: Grade[];
    impressions: Impression[];
}
