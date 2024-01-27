export interface UserInterface {
    uuid: string,
    firstname: string,
    lastname: string,
    email: string,
    group: string,
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

export interface UserEntityInterface {
    uuid: string,
    firstname: string,
    lastname: string,
    classe_name: string,
    classe_apprenticeship: string,
}

export interface User_EntityInterface{
    ID: string,
    USERNAME: string,
    FIRST_NAME: string,
    LAST_NAME: string,
    EMAIL: string
}