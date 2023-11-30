export interface UserInterface {
    uuid: string,
    firstname: string,
    lastname: string,
    email: string,
    group: string,
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}
// export const users: UserInterface[];
