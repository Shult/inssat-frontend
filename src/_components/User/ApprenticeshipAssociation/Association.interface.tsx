export interface AssociationInterface {
    studentUUID: string,
    tutorUUID: string,
    supervisorUUID: string
}

export interface ModalCreateAssociationProps {
    onValidate: () => void;
    show: boolean;
}

export interface ModalUpdateAssociationProps {
    onValidate: () => void;
    show: boolean;
    studentUUID: string;
}
