export enum Level {
    EXCELLENT = "Excellent",
    VERYGOOD = "Très bien",
    GOOD = "Bien",
    QUITEGOOD = "Assez bien",
    FAIR = "Passable",
    INSUFFICIENT = "Insuffisant",
    EMPTY = ""
}

export interface ILevel {
    id: number,
    name: string
}

export interface IImpression {
    id: number,
    content: string,
    level_id: Level,
    activity_id: number,
    student_id: number,
    period_id: number,
    created_at: Date,
    updated_at: Date
}
export interface FormImpressions {
    content: string,
    level_id: number,
    activity_id: number,
    period_id: number,
    student_id: number,
}
export interface IActivity {
    id: number,
    name: string,
    position: number,
    is_delete: boolean,
    is_free: boolean,
    section_id: number,
    created_at: Date,
    updated_at: Date
}

export interface IActivity2 {
    id: number,
    is_free: boolean,
    name: string,
    position: number,
}

export interface IPeriod {
    id: number,
    name: string,
    description: string,
    number:number,
    createdAt: Date,
    updatedAt: Date
}

export interface ISection {
    id: number,
    title: string,
    description: string,
    created_at: Date,
    updated_at: Date
}

export interface ISectionApi {
    id: number;
    title: string;
    "description": string;
    "created_at": Date;
    "updated_at": Date;
    "activities": IActivity2[]
}

export interface IGrade {
    id: number,
    grade: number,
    student_id: string,
    assessment_id: number,
    period_id: number,
    comment: string,
    // created_at: Date,
    // updated_at: Date
}
export interface FormGrades {
    student_id: string,
    grade: number,
    assessment_id: number,
    period_id: number,
    comment: string,
    section_id: number,
}
export interface IAssessment {
    id: number,
    name: string,
    coefficient: number,
    column_6: number,
    created_at: Date,
    updated_at: Date
}

// BIG TRUC
export interface ILevelApi {
    id: number;
    name: string;
}

export interface IImpressionApi {
    id: number;
    content: string;
    level: ILevelApi;
}

export interface IActivityApi {
    id: number;
    name: string;
    position: number;
    impressions: IImpressionApi[];
}

export interface ISectionApi2 {
    id: number;
    title: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    activities: IActivityApi[];
}

// Si vous avez besoin de représenter l'ensemble du tableau de sections :
export interface IDataApi {
    sections: ISectionApi2[];
}
