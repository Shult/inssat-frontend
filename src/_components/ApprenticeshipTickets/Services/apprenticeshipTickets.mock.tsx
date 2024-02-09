import { UserEntityInterface, UserInterface } from "../../User/User.interface";
import { IApprentieceshipTickets, IDataSuivi, ICompany, IGradeDto, ListTickets, FicheSuiviInterface, FollowStudent, ListTicketsInterface } from "./apprenticeshipTickets.interface";


export let dataSuiviMock: IDataSuivi

const student: UserInterface = {uuid: "000-000-001", firstname: "Jade", lastname: "Martin", email: "Jade.Martin@enssat.fr", group: "student", status: "idle"}
const tutor: UserInterface = {uuid: "000-100-001", firstname: "Nolan", lastname: "Lopez", email: "Nolan.Lopez@enssat.fr", group: "supervisor", status: "idle"}
const teacher: UserInterface = {uuid: "100-200-001", firstname: "Aylan", lastname: "Adam", email: "Aylan.Adam@enssat.fr", group: "teacher", status: "idle"}

const company: ICompany = {id: 3, name: "Orange", address: "6 rue du Verger", city: "Orange"}

dataSuiviMock = { company: company, student: student, teacher: teacher, supervisor: tutor}


export let apprenticeshipListTicketsMock: ListTickets = require('./listeTickets.json');

export let apprenticeshipSuiviStudentMock: FicheSuiviInterface = require('./suiviStudent.json');

export let apprenticeshipListStudentFollow: FollowStudent[] = require('./associationSMT.json');

export let apprenticeshipListeTicketsSortedMock: ListTicketsInterface = require('./listeTicketsSorted.json');




export let apprenticeshipTicketsMock: IApprentieceshipTickets[]
apprenticeshipTicketsMock = []

const grade1: IGradeDto = {id: 1, grade: 10, student_id: 3, assessment_name: "Travail réalisé en entreprise", assessment_coefficient: 3, period: 1, comment: ""}
const grade2: IGradeDto = {id: 2, grade: 15, student_id: 3, assessment_name: "Rapport écrit rendu à l'école", assessment_coefficient: 1, period: 1, comment: ""}
const grade3: IGradeDto = {id: 3, grade: 20, student_id: 3, assessment_name: "Soutenance orale", assessment_coefficient: 1, period: 1, comment: ""}

const apprentieceshipTickets1: IApprentieceshipTickets = { period: 1, grades: [grade1, grade2, grade3]}

const grade4: IGradeDto = {id: 1, grade: 20, student_id: 3, assessment_name: "Travail réalisé en entreprise", assessment_coefficient: 3, period: 2, comment: ""}
const grade5: IGradeDto = {id: 2, grade: 13, student_id: 3, assessment_name: "Rapport écrit rendu à l'école", assessment_coefficient: 1, period: 2, comment: ""}
const grade6: IGradeDto = {id: 3, grade: 6, student_id: 3, assessment_name: "Soutenance orale", assessment_coefficient: 1, period: 2, comment: ""}

const apprentieceshipTickets2: IApprentieceshipTickets = { period: 2, grades: [grade4, grade5, grade6]}

apprenticeshipTicketsMock.push(apprentieceshipTickets1)
apprenticeshipTicketsMock.push(apprentieceshipTickets2)


export let listStudentSuiviMock: UserInterface[]
listStudentSuiviMock = []

const studentSuivi1: UserInterface = {uuid: "000-000-001", firstname: "Jade", lastname: "Martin", email: "Jade.Martin@enssat.fr", group: "student", status: "idle"}
const studentSuivi2: UserInterface = {uuid: "000-000-001", firstname: "Jade", lastname: "Martin", email: "Jade.Martin@enssat.fr", group: "student", status: "idle"}
const studentSuivi3: UserInterface = {uuid: "000-000-001", firstname: "Jade", lastname: "Martin", email: "Jade.Martin@enssat.fr", group: "student", status: "idle"}
const studentSuivi4: UserInterface = {uuid: "000-000-001", firstname: "Jade", lastname: "Martin", email: "Jade.Martin@enssat.fr", group: "student", status: "idle"}
const studentSuivi5: UserInterface = {uuid: "000-000-001", firstname: "Jade", lastname: "Martin", email: "Jade.Martin@enssat.fr", group: "student", status: "idle"}

listStudentSuiviMock.push(studentSuivi1)
listStudentSuiviMock.push(studentSuivi2)
listStudentSuiviMock.push(studentSuivi3)
listStudentSuiviMock.push(studentSuivi4)
listStudentSuiviMock.push(studentSuivi5)

export let listStudentSuiviMock2: UserEntityInterface[]
listStudentSuiviMock2 = []