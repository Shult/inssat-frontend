export interface AssociationInterface {
    studentUUID: string,
    tutorUUID: string,
    supervisorUUID: string
}

export interface AssociationsInterface {
    id: number,
    ma_id: string,
    student_id: string,
    tutor_id: string,
    created_at: Date,
    updated_at: Date,
}

export interface AssociationsCreateInterface {
    ma_id: string,
    student_id: string,
    tutor_id: string
}