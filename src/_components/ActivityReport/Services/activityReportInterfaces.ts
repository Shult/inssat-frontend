export enum Level {
    EXCELLENT = "Excellent",
    VERYGOOD = "Très bien",
    GOOD = "Bien",
    QUITEGOOD = "Assez bien",
    FAIR = "Passable",
    INSUFFICIENT = "Insuffisant",
    EMPTY = ""
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

export interface IPeriod {
    id: number,
    name: string,
    created_at: Date,
    updated_at: Date
}

export interface ISection {
    id: number,
    title: string,
    description: string,
    created_at: Date,
    updated_at: Date
}

export interface IGrade {
    id: number,
    grade: number,
    student_id: number,
    assessment_id: number,
    period_id: number,
    comment: string,
    created_at: Date,
    updated_at: Date
}

export interface IAssessment {
    id: number,
    name: string,
    coefficient: number,
    column_6: number,
    created_at: Date,
    updated_at: Date
}