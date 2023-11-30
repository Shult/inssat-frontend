import {UserInterface} from "./User.interface";
import {usersMock} from "./User.mock";

export function fetchUsersAPI(data: any){
    const url = 'https://api.dapi-services.fr/api_blog/users/'+data
    return new Promise<{ users: UserInterface[] }> (
        () => fetch(url).then(response => response.blob())
    );
}

export function importUserAPI(data: any){}

export function updateUserAPI(data: any){}

export function deleteUserAPI(data: any){}

export function getUsersMock (key: any, value: any){
    const userlist: UserInterface[] = []

    for (let i = 0; i < usersMock.length; i++) {
        if (usersMock[i]["uuid"].includes(value)
            || usersMock[i]["firstname"].includes(value)
            || usersMock[i]["lastname"].includes(value)
            || usersMock[i]["email"].includes(value)
            || usersMock[i]["group"].includes(value)
        ) {
            userlist.push(usersMock[i])
        }
    }
    return userlist
}
