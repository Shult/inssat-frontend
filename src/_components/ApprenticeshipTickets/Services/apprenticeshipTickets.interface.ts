import { UserInterface, User_EntityInterface } from "../../User/User.interface"

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

export interface CompanyInterface {
    id: number,
    name: string,
    address: string,
    city: string,
    phone: string
} 

export interface ClassInterface {
    id: number,
    name: string,
    apprenticeship: boolean
}

export interface FicheSuiviInterface {
    ID: string,
    USERNAME: string,
    FIRST_NAME: string,
    LAST_NAME: string,
    EMAIL: string,
    CLASS: ClassInterface,
    COMPANY: CompanyInterface,
    MA: User_EntityInterface,
    TUTOR: User_EntityInterface
}

export interface PeriodInterface {
    id: number,
    name: string,
    description: string,
    number: number,
    created_at: Date,
    updated_at: Date
}

export interface SectionInterface {
    id: number,
    title: string,
    description: string,
    created_at: Date,
    updated_at: Date
}

export interface AssesmentInterface {
    id: number,
    name: string,
    coefficient: number,
    position: number,
    created_at: Date,
    updated_at: Date
}

export interface GradeInterface {
    id: number,
    grade: number,
    student_id: string,
    assessment_id: number,
    period_id: number,
    comment: string,
    section_id: number,
    created_at: Date,
    updated_at: Date,
    assessment: AssesmentInterface,
    period: PeriodInterface,
    section: SectionInterface
}

export interface ListTickets{
    ID: string,
    USERNAME: string,
    FIRST_NAME: string,
    LAST_NAME: string,
    EMAIL: string,
    USER_ATTRIBUTES: any[],
    grades: GradeInterface[]
}

export interface ListTicketsInterface {
    [key: string]: GradeInterface[];
}

export interface FollowStudent{
    student: User_EntityInterface,
    ma: User_EntityInterface
}

export interface ListFollowStudent{
    [key: string]: FollowStudent;
}