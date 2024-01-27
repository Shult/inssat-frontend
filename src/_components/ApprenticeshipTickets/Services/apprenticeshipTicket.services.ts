import { getAllStudentMaTutors, getStudentsAndMAByTutorId, getStudentsAndTutorByMAId } from "../../../_api/student-ma-tutors"
import { getGradesByPk, getSuivi } from "../../../_api/user"
import { AssociationInterface } from "../../User/ApprenticeshipAssociation/Association.interface"
import { IApprentieceshipTickets, IDataSuivi, IGrade } from "./apprenticeshipTickets.interface"



export const getGradesTickets = (id: any) => fetchGradesTickets(id)

async function fetchGradesTickets(id: any): Promise<IGrade> {
    const GradesTicketsResponse = await getGradesByPk(id);
    return GradesTicketsResponse.data
}


export const getDataStudentSuivi = (id: any) => fetchDataStudentExtended(id)

async function fetchDataStudentExtended(id: any): Promise<IDataSuivi> {
    const dataStudentExtendedResponse = await getSuivi(id);
    return dataStudentExtendedResponse.data
}

export const getStudentMaTutors = () => fetchAllStudentMaTutors()

async function fetchAllStudentMaTutors(): Promise<AssociationInterface> {
    const allStudentMaTutorsResponse = await getAllStudentMaTutors();
    return allStudentMaTutorsResponse.data
}

export const getStudentMaForTutor = (tutotId: any) => fetchStudentMaForTutor(tutotId)

async function fetchStudentMaForTutor(tutotId: any): Promise<AssociationInterface> {
    const allStudentMaTutorsResponse = await getStudentsAndMAByTutorId(tutotId);
    return allStudentMaTutorsResponse.data
}

export const getStudentMaForMa = (maId: any) => fetchStudentMaForMa(maId)

async function fetchStudentMaForMa(maId: any): Promise<AssociationInterface> {
    const allStudentMaTutorsResponse = await getStudentsAndTutorByMAId(maId);
    return allStudentMaTutorsResponse.data
}