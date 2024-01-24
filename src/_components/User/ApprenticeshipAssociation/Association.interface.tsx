import {UserInterface} from "../User.interface";

export interface AssociationInterface {
    student_id: string,
    tutor_id: string,
    ma_id: string
}

export interface ModalCreateAssociationProps {
    onValidate: () => void;
    show: boolean;
}

export interface ModalUpdateAssociationProps {
    onValidate: () => void;
    show: boolean;
    student: UserInterface;
}
