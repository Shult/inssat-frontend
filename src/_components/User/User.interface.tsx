export interface UserInterface {
    uuid: string,
    firstname: string,
    lastname: string,
    email: string,
    group: string,
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}
// export const users: UserInterface[];

export interface UserEntityInterface {
    uuid: string,
    firstname: string,
    lastname: string,
    classe_name: string,
    classe_apprenticeship: string,
}
