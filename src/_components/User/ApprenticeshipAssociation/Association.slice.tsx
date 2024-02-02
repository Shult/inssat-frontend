import {AssociationInterface} from "./Association.interface";
import {createSlice} from "@reduxjs/toolkit";

const initialState: AssociationInterface = {
    id: "",
    student_id: "",
    tutor_id: "",
    ma_id: ""
}

export const associationSlice = createSlice({
    name: 'association',
    initialState,
    reducers: {}
})

// export const {} = associationSlice.actions;
// export const selectAssociation = (state: RootState) => state.association;
// export default associationSlice.reducer;
