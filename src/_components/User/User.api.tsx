import {
    getUsers,
    getUserByUUID,
    postUser,
    putUser,
    deleteUser, getUsersByGroup,
} from "../../_api/userServices";
import {UserInterface} from "./User.interface";

// TO REMOVE LATER
const getAllEmails = async () => {
    let emails = []

    const users: UserInterface[] = await getAllUsers()

    for (let i = 0; i < users.length ; i++){
        emails.push(users[i].email)
    }

    return emails
}


// GETTER
const getAllUsers = () => fetchUsers()
const getAllUsersByGroup = (group: string) => fetchUsersByGroup(group)
const getUserByID = (id: string) => fetchUserByID(id)

async function fetchUsers() {
    let users : UserInterface[] = []
    const request = await getUsers()
    if (request.ok){
        users = request.data
    }
    return users
}

async function fetchUsersByGroup(group: string) {
    let users : UserInterface[] = []
    const request = await getUsersByGroup(group)
    if (request.ok){
        users = request.data
    }
    return users
}


async function fetchUserByID(id: string){
    let user : UserInterface = {
        uuid: '',
        firstname: '',
        lastname: '',
        email: '',
        group: '',
        status: 'idle'
    }
    const request = await getUserByUUID(id)
    if (request.ok){
        user = request.data
    }
    return user
}

// CRUD
const createUser = async (info : Array<string>) => {

    // Length === 3 : firstname, lastname and group required
    if (info.length === 3) {

        let user: UserInterface = {
            uuid: generateUUID(),
            firstname: '',
            lastname: '',
            email: '',
            group: '',
            status: 'idle'
        }

        const firstname = info[0]
        const lastname = info[1]
        const email = await generateEmail(firstname, lastname)
        const group = info[2]

        if (firstname !== null && lastname !== null && group != null) {
            user.firstname = firstname
            user.lastname = lastname
            user.email = email
            user.group = group
        }

        try {
            const response = await postUser(user);
            response.ok ? console.log('Created') : console.error('Failed', response.problem);
        }
        catch (error) { console.error('Error:', error) }
    }
    else { console.log('User is invalid') }
}

const updateUser = async (info : Array<string>) => {

    // Length === 5 : uuid, firstname, lastname, email and group required
    if (info.length === 5) {

        let user: UserInterface = {
            uuid: '',
            firstname: '',
            lastname: '',
            email: '',
            group: '',
            status: 'idle'
        }

        const uuid = info[0]
        const firstname = info[1]
        const lastname = info[2]
        const email = info[3]
        const group = info[4]

        if (uuid !== null && firstname !== null && lastname !== null && email !== null && group != null) {
            user.uuid = uuid
            user.firstname = firstname
            user.lastname = lastname
            user.email = email
            user.group = group
        }

        try {
            const response = await putUser(uuid, user);
            response.ok ? console.log('Created') : console.error('Failed', response.problem);
        }
        catch (error) { console.error('Error:', error) }
    }
    else { console.log('User is invalid') }
}

const removeUser = async (id: string) => await deleteUser(id)

function generateUUID(){
    let uuid:any = Math.floor(Math.random() * 10)
    for (let i = 1; i < 32; i++) {
        if (i===7 || i===11 || i===15 || i===19){
            uuid +=  Math.floor(Math.random() * 10)+"-"
        }
        else {
            uuid +=  Math.floor(Math.random() * 10)+""
        }
    }
    return uuid
}

function generateEmail(firstname: string, lastname: string){

    // construct : s.name@enssat.fr
    const firstLetterFirstname: string = firstname.charAt(0)
    lastname = lastname.replace( /\s/g, '')

    let newEmail: string = `${firstLetterFirstname}.${lastname}@enssat.fr`

    return checkEmail(newEmail)
}

async function checkEmail(email: string) {
    const emails = await getAllEmails()

    for (let i = 0; i < emails.length; i++) {
        // while not found keep searching
        if (emails[i] !== email) {
            continue
        }

        // if s.name@enssat.fr already exists, new email's format like: s.name1@enssat.fr
        else {
            const frags = email.split("@")
            frags[0] += 1
            email = frags[0].concat(frags[1])
            break
        }
    }

    return email
}

export {
    getAllUsers,
    getAllUsersByGroup,
    getUserByID,
    createUser,
    updateUser,
    removeUser
}
