export interface IPeriod {
    id: number,
    name: string,
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

export interface IAssesment {
    id: number,
    name: string,
    coefficient: number,
    created_at: Date,
    updated_at: Date
}

export interface IApprentieceshipTickets {
    period_id: number,
    grades: IGrade[]
}