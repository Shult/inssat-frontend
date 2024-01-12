import {UserInterface} from "./User.interface";
import {getUsersMock} from "./User.api";
import React, {useState} from "react";

import "./UserDropdown.css"

const UserDropdown = ({className = "w33", id = "select-user", usertype = "user"}) => {
    const [searched, setSearched] = useState("");
    const [searchedValue, setValue] = useState<UserInterface | null>(null);
    const users = getUserBySearch(searched)

    function getUserBySearch(searched: string, users: UserInterface[] = getUsersMock("group", usertype)){
        if (searched.length > 1){
            let newList = []
            searched = searched.toUpperCase()
            for (let i = 0; i < users.length; i++) {

                let userFirstname = getUsersMock("uuid", users[i].uuid).pop()?.firstname.toUpperCase()
                let userLastname = getUsersMock("uuid", users[i].uuid).pop()?.lastname.toUpperCase()

                if (userFirstname?.includes(searched) || userLastname?.includes(searched)) {
                    newList.push(users[i])
                }
            }
            return newList
        }
        else { return [] }
    }


    return (
        <div className="w100 UserDropdown">
            <h5>{usertype}</h5>
            <input
                   className="w100"
                   type={"text"}
                   name={'searchUserByName'}
                   placeholder={'Recherche par nom...'}
                   onChange={ e => setSearched(e.target.value) }
                   value = { searchedValue? searchedValue.firstname + " " + searchedValue.lastname : searched }
            />
            <input
                id={id}
                type={"hidden"}
                value={searchedValue? searchedValue.uuid : searched}
            />

            <div>
                {users.map( user =>
                    <button key={user.uuid}
                            value={user.uuid}
                            onClick={() => setValue(user) }
                    >{user.firstname} {user.lastname}</button>
                )}
            </div>

        </div>
    )

}
export default UserDropdown
