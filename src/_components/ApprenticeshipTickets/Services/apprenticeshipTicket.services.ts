import { getUsersByGroupId } from "../../../_api/group"
import { getAllStudentMaTutors, getAllStudentMaTutorsBySearched, getStudentsAndMAByTutorId, getStudentsAndTutorByMAId } from "../../../_api/student-ma-tutors"
import { getGradesByPk, getSuivi, getUserById } from "../../../_api/user"
import { AssociationInterface, AssociationsInterface } from "../../User/ApprenticeshipAssociation/Association.interface"
import { UserInterface } from "../../User/User.interface"
import { IApprentieceshipTickets, IDataSuivi, IGrade, ListFollowStudent, ListTickets, UserGroup } from "./apprenticeshipTickets.interface"



export const getGradesTickets = (id: any) => fetchGradesTickets(id)



export const getGradesTicketsSorted = async (id: any): Promise<any> => {
    const gradesTicketsResponse = await fetchGradesTickets(id);
  
    // Filtrer les notes avec le title "Notation"
    const filteredNotes = gradesTicketsResponse?.grades?.filter((grade: any) => grade.section.title === "Notation");
  
    // Grouper les notes par période
    const notesByPeriod = filteredNotes?.reduce((acc: any, grade: any) => {
      const periodId = grade.period.id;
      if (!acc[periodId]) {
        acc[periodId] = [];
      }
      acc[periodId].push(grade);
      return acc;
    }, {});
  
    // Trier les notes par ordre croissant pour chaque période
    for (const periodId in notesByPeriod) {
      if (notesByPeriod.hasOwnProperty(periodId)) {
        notesByPeriod[periodId].sort((a: any, b: any) => a.period.number - b.period.number);
      }
    }
  
    // Retourner le résultat
    return notesByPeriod;
  };

  export const getGradesTicketsSorted2 = async (id: any): Promise<any> => {
    const gradesTicketsResponse = await fetchGradesTickets(id);
  
    // Filtrer les notes avec le title "Notation"
    const filteredNotes = gradesTicketsResponse.grades.filter(
      (grade: any) => grade.section.title === "Notation"
    );
  
    // Grouper les notes par période
    const notesByPeriod = filteredNotes.reduce((acc: any, grade: any) => {
      const periodId = grade.period.id;
      if (!acc[periodId]) {
        acc[periodId] = [];
      }
      acc[periodId].push(grade);
      return acc;
    }, {});
  
    // Convertir l'objet en liste
    const resultList = Object.entries(notesByPeriod).map(([periodId, grades]) => ({
      [periodId]: grades,
    }));
  
    // Trier les notes par ordre croissant pour chaque période
    for (const periodId in notesByPeriod) {
      if (notesByPeriod.hasOwnProperty(periodId)) {
        notesByPeriod[periodId].sort(
          (a: any, b: any) => a.period.number - b.period.number
        );
      }
    }
  
    // Retourner le résultat
    return resultList;
  };
  

async function fetchGradesTickets(id: any): Promise<ListTickets> {
    const GradesTicketsResponse = await getGradesByPk(id);
    return GradesTicketsResponse.data
}


export const getUserByID = (id:any) => fetchgetUserByID(id);

async function fetchgetUserByID(id: any): Promise<UserInterface> {
  const UserByID = await getUserById(id);
  return UserByID.data
}



export const getDataAllStudentMaTutorsBySearched = (id: any) => fetchAllStudentMaTutorsBySearched(id)

async function fetchAllStudentMaTutorsBySearched(id: any): Promise<AssociationsInterface> {
    const allStudentMaTutorsBySearchedResponse = await getAllStudentMaTutorsBySearched(id);
    return allStudentMaTutorsBySearchedResponse.data
}

export const getDataStudentSuivi = (id: any) => fetchDataStudentExtended(id)

async function fetchDataStudentExtended(id: any): Promise<IDataSuivi> {
    const dataStudentExtendedResponse = await getSuivi(id);
    return dataStudentExtendedResponse.data
}


export const getStudentMaTutors = () => fetchAllStudentMaTutors()

async function fetchAllStudentMaTutors(): Promise<AssociationsInterface> {
    const allStudentMaTutorsResponse = await getAllStudentMaTutors();
    return allStudentMaTutorsResponse.data
}

export const getStudentMaForTutor = (tutotId: any) => fetchStudentMaForTutor(tutotId)

async function fetchStudentMaForTutor(tutotId: any): Promise<ListFollowStudent> {
    const allStudentMaTutorsResponse = await getStudentsAndMAByTutorId(tutotId);
    return allStudentMaTutorsResponse.data
}

export const getStudentMaForMa = (maId: any) => fetchStudentMaForMa(maId)

async function fetchStudentMaForMa(maId: any): Promise<ListFollowStudent> {
    const allStudentMaTutorsResponse = await getStudentsAndTutorByMAId(maId);
    return allStudentMaTutorsResponse.data
}

export const getStudentGroupUsers = ( )=> fetchStudentGroupUsers()

async function fetchStudentGroupUsers(): Promise<UserGroup> { 
    const studentGroupId = "7bbe885d-49c7-48a5-8439-64e6eee4de49";
    const allStudentGroupUsersResponse = await getUsersByGroupId(studentGroupId);
    return allStudentGroupUsersResponse.data
}

export const getTutorGroupUsers = ( )=> fetchTutorGroupUsers()

async function fetchTutorGroupUsers(): Promise<UserGroup> { 
    const tutorGroupId = "88ccdd92-f5fe-46af-a8e1-72aae50809b6";
    const allTutorGroupUsersResponse = await getUsersByGroupId(tutorGroupId);
    return allTutorGroupUsersResponse.data
}

export const getMaGroupUsers = ( )=> fetchMaGroupUsers()

async function fetchMaGroupUsers(): Promise<UserGroup> { 
    const maGroupId = "dc3d01b0-9cf0-40fc-be47-08c4f61e536f";
    const allMaGroupUsersResponse = await getUsersByGroupId(maGroupId);
    return allMaGroupUsersResponse.data
}