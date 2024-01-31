import {UserInterface} from "./User.interface";
import {useEffect, useState} from "react";
import {getUsersByGroup} from "../../_api/userServices";
const UserSelector = ({className = "w33", id = "select-student", usertype = ""}) => {

    useEffect(() => {
        getUsersByGroup(usertype).then((result: any) => setUsers(result))
    }, []);

    const [users, setUsers] = useState<UserInterface[]>([])

    return (
        <div className={className}>
            <h6 className={"w100"}>{usertype}</h6>
            <select className={"w100"} id={id}>
                {
                    users.map( user =>
                        <option key={user.uuid} value={user.uuid}>{user.firstname} {user.lastname}</option>
                    )
                }
            </select>
        </div>
    )
}


export default UserSelector
