import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../_store/store";
import UserServices from "../../services/UserServices";
import {UserInterface} from "./User.interface";


const initialState: UserInterface = {
    uuid: "",
    firstname: "",
    lastname: "",
    email: "",
    group: "",
    status: 'idle'
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadUser(state){
            state.uuid = UserServices.getTokenParsed()?.["uuid"]
            state.firstname = UserServices.getTokenParsed()?.["given_name"]
            state.lastname = UserServices.getTokenParsed()?.["family_name"]
            state.email = UserServices.getTokenParsed()?.["email"]
            state.group = UserServices.getTokenParsed()?.["group"]
        }
    }
})

export const { loadUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
