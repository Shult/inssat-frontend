import {UserInterface} from "./User.interface";
import {AssociationInterface} from "./ApprenticeshipAssociation/Association.interface";


export let usersMock: UserInterface[]

usersMock = []

const student1: UserInterface = {uuid: "000-000-001", firstname: "Jade", lastname: "Martin", email: "Jade.Martin@enssat.fr", group: "student", status: "idle"}
const student2: UserInterface = {uuid: "000-000-002", firstname: "Louise", lastname: "Bernard", email: "Louise.Bernard@enssat.fr", group: "student", status: "idle"}
const student3: UserInterface = {uuid: "000-000-003", firstname: "Ambre", lastname: "Thomas", email: "Ambre.Thomas@enssat.fr", group: "student", status: "idle"}
const student4: UserInterface = {uuid: "000-000-004", firstname: "Alba", lastname: "Petit", email: "Alba.Petit@enssat.fr", group: "student", status: "idle"}
const student5: UserInterface = {uuid: "000-000-005", firstname: "Emma", lastname: "Robert", email: "Emma.Robert@enssat.fr", group: "student", status: "idle"}
const student6: UserInterface = {uuid: "000-000-006", firstname: "Rose", lastname: "Richard", email: "Rose.Richard@enssat.fr", group: "student", status: "idle"}
const student7: UserInterface = {uuid: "000-000-007", firstname: "Alice", lastname: "Durand", email: "Alice.Durand@enssat.fr", group: "student", status: "idle"}
const student8: UserInterface = {uuid: "000-000-008", firstname: "Romy", lastname: "Dubois", email: "Romy.Dubois@enssat.fr", group: "student", status: "idle"}
const student9: UserInterface = {uuid: "000-000-009", firstname: "Anna", lastname: "Moreau", email: "Anna.Moreau@enssat.fr", group: "student", status: "idle"}
const student10: UserInterface = {uuid: "000-000-010", firstname: "Lina", lastname: "Laurent", email: "Lina.Laurent@enssat.fr", group: "student", status: "idle"}
const student11: UserInterface = {uuid: "000-000-011", firstname: "Léna", lastname: "Simon", email: "Léna.Simon@enssat.fr", group: "student", status: "idle"}
const student12: UserInterface = {uuid: "000-000-012", firstname: "Mia", lastname: "Michel", email: "Mia.Michel@enssat.fr", group: "student", status: "idle"}
const student13: UserInterface = {uuid: "000-000-013", firstname: "Lou", lastname: "Lefebvre", email: "Lou.Lefebvre@enssat.fr", group: "student", status: "idle"}
const student14: UserInterface = {uuid: "000-000-014", firstname: "Julia", lastname: "Leroy", email: "Julia.Leroy@enssat.fr", group: "student", status: "idle"}
const student15: UserInterface = {uuid: "000-000-015", firstname: "Chloé", lastname: "Roux", email: "Chloé.Roux@enssat.fr", group: "student", status: "idle"}
const student16: UserInterface = {uuid: "000-000-016", firstname: "Alma", lastname: "David", email: "Alma.David@enssat.fr", group: "student", status: "idle"}
const student17: UserInterface = {uuid: "000-000-017", firstname: "Agathe", lastname: "Bertrand", email: "Agathe.Bertrand@enssat.fr", group: "student", status: "idle"}
const student18: UserInterface = {uuid: "000-000-018", firstname: "Iris", lastname: "Morel", email: "Iris.Morel@enssat.fr", group: "student", status: "idle"}
const student19: UserInterface = {uuid: "000-000-019", firstname: "Inaya", lastname: "Fournier", email: "Inaya.Fournier@enssat.fr", group: "student", status: "idle"}
const student20: UserInterface = {uuid: "000-000-020", firstname: "Charlie", lastname: "Girard", email: "Charlie.Girard@enssat.fr", group: "student", status: "idle"}
const student21: UserInterface = {uuid: "000-000-021", firstname: "Juliette", lastname: "Bonnet", email: "Juliette.Bonnet@enssat.fr", group: "student", status: "idle"}
const student22: UserInterface = {uuid: "000-000-022", firstname: "Léa", lastname: "Dupont", email: "Léa.Dupont@enssat.fr", group: "student", status: "idle"}
const student23: UserInterface = {uuid: "000-000-023", firstname: "Victoire", lastname: "Lambert", email: "Victoire.Lambert@enssat.fr", group: "student", status: "idle"}
const student24: UserInterface = {uuid: "000-000-024", firstname: "Luna", lastname: "Fontaine", email: "Luna.Fontaine@enssat.fr", group: "student", status: "idle"}
const student25: UserInterface = {uuid: "000-000-025", firstname: "Giulia", lastname: "Rousseau", email: "Giulia.Rousseau@enssat.fr", group: "student", status: "idle"}
const student26: UserInterface = {uuid: "000-000-026", firstname: "Adèle", lastname: "Vincent", email: "Adèle.Vincent@enssat.fr", group: "student", status: "idle"}
const student27: UserInterface = {uuid: "000-000-027", firstname: "Jeanne", lastname: "Muller", email: "Jeanne.Muller@enssat.fr", group: "student", status: "idle"}
const student28: UserInterface = {uuid: "000-000-028", firstname: "Nina", lastname: "Lefevre", email: "Nina.Lefevre@enssat.fr", group: "student", status: "idle"}
const student29: UserInterface = {uuid: "000-000-029", firstname: "Éva", lastname: "Faure", email: "Éva.Faure@enssat.fr", group: "student", status: "idle"}
const student30: UserInterface = {uuid: "000-000-030", firstname: "Olivia", lastname: "Andre", email: "Olivia.Andre@enssat.fr", group: "student", status: "idle"}
const student31: UserInterface = {uuid: "000-000-031", firstname: "Gabriel", lastname: "Nolan", email: "Gabriel.Nolan@enssat.fr", group: "student", status: "idle"}
const student32: UserInterface = {uuid: "000-000-032", firstname: "Léo", lastname: "Antoine", email: "Léo.Antoine@enssat.fr", group: "student", status: "idle"}
const student33: UserInterface = {uuid: "000-000-033", firstname: "Raphaël", lastname: "Simon", email: "Raphaël.Simon@enssat.fr", group: "student", status: "idle"}
const student34: UserInterface = {uuid: "000-000-034", firstname: "Maël", lastname: "Samuel", email: "Maël.Samuel@enssat.fr", group: "student", status: "idle"}
const student35: UserInterface = {uuid: "000-000-035", firstname: "Louis", lastname: "Mathéo", email: "Louis.Mathéo@enssat.fr", group: "student", status: "idle"}
const student36: UserInterface = {uuid: "000-000-036", firstname: "Noah", lastname: "Côme", email: "Noah.Côme@enssat.fr", group: "student", status: "idle"}
const student37: UserInterface = {uuid: "000-000-037", firstname: "Jules", lastname: "Kaïs", email: "Jules.Kaïs@enssat.fr", group: "student", status: "idle"}
const student38: UserInterface = {uuid: "000-000-038", firstname: "Arthur", lastname: "Alessio", email: "Arthur.Alessio@enssat.fr", group: "student", status: "idle"}
const student39: UserInterface = {uuid: "000-000-039", firstname: "Adam", lastname: "Yanis", email: "Adam.Yanis@enssat.fr", group: "student", status: "idle"}
const student40: UserInterface = {uuid: "000-000-040", firstname: "Lucas", lastname: "Camille", email: "Lucas.Camille@enssat.fr", group: "student", status: "idle"}
const student41: UserInterface = {uuid: "000-000-041", firstname: "Liam", lastname: "Léandre", email: "Liam.Léandre@enssat.fr", group: "student", status: "idle"}
const student42: UserInterface = {uuid: "000-000-042", firstname: "Sacha", lastname: "Owen", email: "Sacha.Owen@enssat.fr", group: "student", status: "idle"}
const student43: UserInterface = {uuid: "000-000-043", firstname: "Isaac", lastname: "Ismaël", email: "Isaac.Ismaël@enssat.fr", group: "student", status: "idle"}
const student44: UserInterface = {uuid: "000-000-044", firstname: "Gabin", lastname: "Maxence", email: "Gabin.Maxence@enssat.fr", group: "student", status: "idle"}
const student45: UserInterface = {uuid: "000-000-045", firstname: "Éden", lastname: "Mahé", email: "Éden.Mahé@enssat.fr", group: "student", status: "idle"}
const student46: UserInterface = {uuid: "000-000-046", firstname: "Hugo", lastname: "Soan", email: "Hugo.Soan@enssat.fr", group: "student", status: "idle"}
const student47: UserInterface = {uuid: "000-000-047", firstname: "Naël", lastname: "Évan", email: "Naël.Évan@enssat.fr", group: "student", status: "idle"}
const student48: UserInterface = {uuid: "000-000-048", firstname: "Aaron", lastname: "Naïm", email: "Aaron.Naïm@enssat.fr", group: "student", status: "idle"}
const student49: UserInterface = {uuid: "000-000-049", firstname: "Mohamed", lastname: "Maé", email: "Mohamed.Maé@enssat.fr", group: "student", status: "idle"}
const student50: UserInterface = {uuid: "000-000-050", firstname: "Léon", lastname: "Livio", email: "Léon.Livio@enssat.fr", group: "student", status: "idle"}
const student51: UserInterface = {uuid: "000-000-051", firstname: "Paul", lastname: "Aylan", email: "Paul.Aylan@enssat.fr", group: "student", status: "idle"}
const student52: UserInterface = {uuid: "000-000-052", firstname: "Noé", lastname: "Charly", email: "Noé.Charly@enssat.fr", group: "student", status: "idle"}
const student53: UserInterface = {uuid: "000-000-053", firstname: "Marceau", lastname: "Oscar", email: "Marceau.Oscar@enssat.fr", group: "student", status: "idle"}
const student54: UserInterface = {uuid: "000-000-054", firstname: "Ethan", lastname: "Pablo", email: "Ethan.Pablo@enssat.fr", group: "student", status: "idle"}
const student55: UserInterface = {uuid: "000-000-055", firstname: "Nathan", lastname: "Clément", email: "Nathan.Clément@enssat.fr", group: "student", status: "idle"}
const student56: UserInterface = {uuid: "000-000-056", firstname: "Théo", lastname: "Ilyan", email: "Théo.Ilyan@enssat.fr", group: "student", status: "idle"}
const student57: UserInterface = {uuid: "000-000-057", firstname: "Tom", lastname: "Basile", email: "Tom.Basile@enssat.fr", group: "student", status: "idle"}
const student58: UserInterface = {uuid: "000-000-058", firstname: "Nino", lastname: "Alexandre", email: "Nino.Alexandre@enssat.fr", group: "student", status: "idle"}
const student59: UserInterface = {uuid: "000-000-059", firstname: "Marius", lastname: "Charlie", email: "Marius.Charlie@enssat.fr", group: "student", status: "idle"}
const student60: UserInterface = {uuid: "000-000-060", firstname: "Ayden", lastname: "Noa", email: "Ayden.Noa@enssat.fr", group: "student", status: "idle"}

const supervisor01: UserInterface = {uuid: "000-100-001", firstname: "Nolan", lastname: "Lopez", email: "Nolan.Lopez@enssat.fr", group: "supervisor", status: "idle"}
const supervisor02: UserInterface = {uuid: "000-100-002", firstname: "Antoine", lastname: "Jean", email: "Antoine.Jean@enssat.fr", group: "supervisor", status: "idle"}
const supervisor03: UserInterface = {uuid: "000-100-003", firstname: "Simon", lastname: "Dupuy", email: "Simon.Dupuy@enssat.fr", group: "supervisor", status: "idle"}
const supervisor04: UserInterface = {uuid: "000-100-004", firstname: "Samuel", lastname: "Guillot", email: "Samuel.Guillot@enssat.fr", group: "supervisor", status: "idle"}
const supervisor05: UserInterface = {uuid: "000-100-005", firstname: "Mathéo", lastname: "Hubert", email: "Mathéo.Hubert@enssat.fr", group: "supervisor", status: "idle"}
const supervisor06: UserInterface = {uuid: "000-100-006", firstname: "Côme", lastname: "Berger", email: "Côme.Berger@enssat.fr", group: "supervisor", status: "idle"}
const supervisor07: UserInterface = {uuid: "000-100-007", firstname: "Kaïs", lastname: "Carpentier", email: "Kaïs.Carpentier@enssat.fr", group: "supervisor", status: "idle"}
const supervisor08: UserInterface = {uuid: "000-100-008", firstname: "Alessio", lastname: "Sanchez", email: "Alessio.Sanchez@enssat.fr", group: "supervisor", status: "idle"}
const supervisor09: UserInterface = {uuid: "000-100-009", firstname: "Yanis", lastname: "Dupuis", email: "Yanis.Dupuis@enssat.fr", group: "supervisor", status: "idle"}
const supervisor10: UserInterface = {uuid: "000-100-010", firstname: "Camille", lastname: "Moulin", email: "Camille.Moulin@enssat.fr", group: "supervisor", status: "idle"}
const supervisor11: UserInterface = {uuid: "000-100-011", firstname: "Léandre", lastname: "Louis", email: "Léandre.Louis@enssat.fr", group: "supervisor", status: "idle"}
const supervisor12: UserInterface = {uuid: "000-100-012", firstname: "Owen", lastname: "Deschamps", email: "Owen.Deschamps@enssat.fr", group: "supervisor", status: "idle"}
const supervisor13: UserInterface = {uuid: "000-100-013", firstname: "Ismaël", lastname: "Huet", email: "Ismaël.Huet@enssat.fr", group: "supervisor", status: "idle"}
const supervisor14: UserInterface = {uuid: "000-100-014", firstname: "Maxence", lastname: "Vasseur", email: "Maxence.Vasseur@enssat.fr", group: "supervisor", status: "idle"}
const supervisor15: UserInterface = {uuid: "000-100-015", firstname: "Mahé", lastname: "Perez", email: "Mahé.Perez@enssat.fr", group: "supervisor", status: "idle"}
const supervisor16: UserInterface = {uuid: "000-100-016", firstname: "Soan", lastname: "Boucher", email: "Soan.Boucher@enssat.fr", group: "supervisor", status: "idle"}
const supervisor17: UserInterface = {uuid: "000-100-017", firstname: "Évan", lastname: "Fleury", email: "Évan.Fleury@enssat.fr", group: "supervisor", status: "idle"}
const supervisor18: UserInterface = {uuid: "000-100-018", firstname: "Naïm", lastname: "Royer", email: "Naïm.Royer@enssat.fr", group: "supervisor", status: "idle"}
const supervisor19: UserInterface = {uuid: "000-100-019", firstname: "Maé", lastname: "Klein", email: "Maé.Klein@enssat.fr", group: "supervisor", status: "idle"}
const supervisor20: UserInterface = {uuid: "000-100-020", firstname: "Livio", lastname: "Jacquet", email: "Livio.Jacquet@enssat.fr", group: "supervisor", status: "idle"}

const tutor01: UserInterface = {uuid: "100-200-001", firstname: "Aylan", lastname: "Adam", email: "Aylan.Adam@enssat.fr", group: "teacher", status: "idle"}
const tutor02: UserInterface = {uuid: "100-200-002", firstname: "Charly", lastname: "Paris", email: "Charly.Paris@enssat.fr", group: "teacher", status: "idle"}
const tutor03: UserInterface = {uuid: "100-200-003", firstname: "Oscar", lastname: "Poirier", email: "Oscar.Poirier@enssat.fr", group: "teacher", status: "idle"}
const tutor04: UserInterface = {uuid: "100-200-004", firstname: "Pablo", lastname: "Marty", email: "Pablo.Marty@enssat.fr", group: "teacher", status: "idle"}
const tutor05: UserInterface = {uuid: "100-200-005", firstname: "Clément", lastname: "Aubry", email: "Clément.Aubry@enssat.fr", group: "teacher", status: "idle"}
const tutor06: UserInterface = {uuid: "100-200-006", firstname: "Ilyan", lastname: "Guyot", email: "Ilyan.Guyot@enssat.fr", group: "teacher", status: "idle"}
const tutor07: UserInterface = {uuid: "100-200-007", firstname: "Basile", lastname: "Carre", email: "Basile.Carre@enssat.fr", group: "teacher", status: "idle"}
const tutor08: UserInterface = {uuid: "100-200-008", firstname: "Alexandre", lastname: "Charles", email: "Alexandre.Charles@enssat.fr", group: "teacher", status: "idle"}
const tutor09: UserInterface = {uuid: "100-200-009", firstname: "Charlie", lastname: "Renault", email: "Charlie.Renault@enssat.fr", group: "teacher", status: "idle"}
const tutor10: UserInterface = {uuid: "100-200-010", firstname: "Noa", lastname: "Charpentier", email: "Noa.Charpentier@enssat.fr", group: "teacher", status: "idle"}

usersMock.push(student1)
usersMock.push(student2)
usersMock.push(student3)
usersMock.push(student4)
usersMock.push(student5)
usersMock.push(student6)
usersMock.push(student7)
usersMock.push(student8)
usersMock.push(student9)
usersMock.push(student10)
usersMock.push(student11)
usersMock.push(student12)
usersMock.push(student13)
usersMock.push(student14)
usersMock.push(student15)
usersMock.push(student16)
usersMock.push(student17)
usersMock.push(student18)
usersMock.push(student19)
usersMock.push(student20)
usersMock.push(student21)
usersMock.push(student22)
usersMock.push(student23)
usersMock.push(student24)
usersMock.push(student25)
usersMock.push(student26)
usersMock.push(student27)
usersMock.push(student28)
usersMock.push(student29)
usersMock.push(student30)
usersMock.push(student31)
usersMock.push(student32)
usersMock.push(student33)
usersMock.push(student34)
usersMock.push(student35)
usersMock.push(student36)
usersMock.push(student37)
usersMock.push(student38)
usersMock.push(student39)
usersMock.push(student40)
usersMock.push(student41)
usersMock.push(student42)
usersMock.push(student43)
usersMock.push(student44)
usersMock.push(student45)
usersMock.push(student46)
usersMock.push(student47)
usersMock.push(student48)
usersMock.push(student49)
usersMock.push(student50)
usersMock.push(student51)
usersMock.push(student52)
usersMock.push(student53)
usersMock.push(student54)
usersMock.push(student55)
usersMock.push(student56)
usersMock.push(student57)
usersMock.push(student58)
usersMock.push(student59)
usersMock.push(student60)

usersMock.push(supervisor01)
usersMock.push(supervisor02)
usersMock.push(supervisor03)
usersMock.push(supervisor04)
usersMock.push(supervisor05)
usersMock.push(supervisor06)
usersMock.push(supervisor07)
usersMock.push(supervisor08)
usersMock.push(supervisor09)
usersMock.push(supervisor10)
usersMock.push(supervisor11)
usersMock.push(supervisor12)
usersMock.push(supervisor13)
usersMock.push(supervisor14)
usersMock.push(supervisor15)
usersMock.push(supervisor16)
usersMock.push(supervisor17)
usersMock.push(supervisor18)
usersMock.push(supervisor19)
usersMock.push(supervisor20)

usersMock.push(tutor01)
usersMock.push(tutor02)
usersMock.push(tutor03)
usersMock.push(tutor04)
usersMock.push(tutor05)
usersMock.push(tutor06)
usersMock.push(tutor07)
usersMock.push(tutor08)
usersMock.push(tutor09)
usersMock.push(tutor10)

export let associationMock: AssociationInterface[]

associationMock = []

const associationMock01: AssociationInterface = {student_id: "000-000-001", tutor_id: "100-200-001", ma_id: "000-100-001"}
const associationMock02: AssociationInterface = {student_id: "000-000-032", tutor_id: "100-200-002", ma_id: "000-100-002"}
const associationMock03: AssociationInterface = {student_id: "000-000-003", tutor_id: "100-200-003", ma_id: "000-100-003"}
const associationMock04: AssociationInterface = {student_id: "000-000-034", tutor_id: "100-200-004", ma_id: "000-100-004"}
const associationMock05: AssociationInterface = {student_id: "000-000-002", tutor_id: "100-200-005", ma_id: "000-100-005"}
const associationMock06: AssociationInterface = {student_id: "000-000-033", tutor_id: "100-200-006", ma_id: "000-100-006"}
const associationMock07: AssociationInterface = {student_id: "000-000-004", tutor_id: "100-200-007", ma_id: "000-100-007"}
const associationMock08: AssociationInterface = {student_id: "000-000-035", tutor_id: "100-200-008", ma_id: "000-100-008"}
const associationMock09: AssociationInterface = {student_id: "000-000-003", tutor_id: "100-200-009", ma_id: "000-100-009"}
const associationMock10: AssociationInterface = {student_id: "000-000-034", tutor_id: "100-200-010", ma_id: "000-100-010"}
const associationMock11: AssociationInterface = {student_id: "000-000-005", tutor_id: "100-200-001", ma_id: "000-100-001"}
const associationMock12: AssociationInterface = {student_id: "000-000-036", tutor_id: "100-200-002", ma_id: "000-100-002"}
const associationMock13: AssociationInterface = {student_id: "000-000-004", tutor_id: "100-200-003", ma_id: "000-100-003"}
const associationMock14: AssociationInterface = {student_id: "000-000-035", tutor_id: "100-200-004", ma_id: "000-100-004"}
const associationMock15: AssociationInterface = {student_id: "000-000-006", tutor_id: "100-200-005", ma_id: "000-100-005"}
const associationMock16: AssociationInterface = {student_id: "000-000-037", tutor_id: "100-200-006", ma_id: "000-100-006"}
const associationMock17: AssociationInterface = {student_id: "000-000-005", tutor_id: "100-200-007", ma_id: "000-100-007"}
const associationMock18: AssociationInterface = {student_id: "000-000-036", tutor_id: "100-200-008", ma_id: "000-100-008"}
const associationMock19: AssociationInterface = {student_id: "000-000-007", tutor_id: "100-200-009", ma_id: "000-100-009"}
const associationMock20: AssociationInterface = {student_id: "000-000-038", tutor_id: "100-200-010", ma_id: "000-100-010"}

associationMock.push(associationMock01)
associationMock.push(associationMock02)
associationMock.push(associationMock03)
associationMock.push(associationMock04)
associationMock.push(associationMock05)
associationMock.push(associationMock06)
associationMock.push(associationMock07)
associationMock.push(associationMock08)
associationMock.push(associationMock09)
associationMock.push(associationMock10)
associationMock.push(associationMock11)
associationMock.push(associationMock12)
associationMock.push(associationMock13)
associationMock.push(associationMock14)
associationMock.push(associationMock15)
associationMock.push(associationMock16)
associationMock.push(associationMock17)
associationMock.push(associationMock18)
associationMock.push(associationMock19)
associationMock.push(associationMock20)
