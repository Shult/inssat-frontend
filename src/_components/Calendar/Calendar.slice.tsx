import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {EMPTY_URL, REMOTE_URL} from "./Calendar.const"
import {CalendarInterface} from "./Calendar.interface"
import {fetchCalendar} from "./Calendar.api";
import {RootState} from "../../_store/store";
import UserServices from "../../services/UserServices";

const initialState: CalendarInterface = {
    url: REMOTE_URL,
    status: 'idle'
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        deleteCalendar: (state) => {
            state.status = 'idle';
            state.url = EMPTY_URL;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(importCalendar.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(importCalendar.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.url = action.payload;
            })
            .addCase(importCalendar.rejected, (state) => {
                state.status = 'rejected';
            });
    }
})


export const importCalendar = createAsyncThunk(
    'calendar/fetchCalendar',
    async (url: string) => {
        const token = UserServices.getTokenParsed()
        const remote = "https://api.dapi-services.fr/ade/"+token?.["ade_link"]
        const response = await fetchCalendar(remote, {headers: {"X-Requested-With": "XMLHttpRequest"}});
        return response.data;
    }
);


export const { deleteCalendar } = calendarSlice.actions;
export const selectCalendar = (state: RootState) => state.calendar.url;
export default calendarSlice.reducer;
