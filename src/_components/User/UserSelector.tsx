import {UserInterface} from "./User.interface";
import {getUsersMock} from "./User.api";

const UserSelector = ({className = "w33", id = "select-student", usertype = "student"}) => {
    const users: UserInterface[] = getUsersMock("group", usertype)

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
