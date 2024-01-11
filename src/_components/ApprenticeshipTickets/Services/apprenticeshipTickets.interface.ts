import { UserInterface } from "../../User/User.interface"

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

export interface IGradeDto {
    id: number,
    grade: number,
    student_id: number,
    assessment_name: string,
    assessment_coefficient: number,
    period: number,
    comment: string,

}

export interface IAssesment {
    id: number,
    name: string,
    coefficient: number,
    created_at: Date,
    updated_at: Date
}

export interface IApprentieceshipTickets {
    period: number,
    grades: IGradeDto[]
}

export interface ICompany {
    id: number,
    name: string,
    address: string,
    city: string
}

export interface IDataSuivi {
    company: ICompany,
    student: UserInterface,
    teacher: UserInterface,
    supervisor: UserInterface
}