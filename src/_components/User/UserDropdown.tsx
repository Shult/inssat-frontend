import {UserInterface} from "./User.interface";
import {getUsersMock} from "./User.api";
import React, {useState} from "react";

import "./UserDropdown.css"

const UserDropdown = ({className = "w33", id = "select-user", usertype = "user"}) => {
    const [focused, setFocus] = useState(false)
    const [searched, setSearched] = useState("");
    const [searchedValue, setValue] = useState( "");
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
        <div className="w100 dropdown">
            <h5>{usertype}</h5>
            <input className="w100"
                   type={"text"}
                   name={'searchPostByName'}
                   placeholder={'Recherche par nom...'}
                   onFocus={ () => setFocus(true) }
                   onChange={ e => setSearched(e.target.value) }
                   value = { searchedValue? searchedValue : searched }
            />
            <div>
                { focused ? users.map( user =>
                    <button key={user.uuid}
                            value={user.uuid}
                            onClick={() => {
                                let firstname = getUsersMock("uuid", user.uuid).pop()?.firstname
                                let lastname = getUsersMock("uuid", user.uuid).pop()?.lastname
                                let content = firstname+" "+lastname
                                setValue(content)
                                setFocus(false)
                            }}
                    >{user.firstname} {user.lastname}</button>
                ) : <></> }
            </div>

        </div>
    )

}
export default UserDropdown
