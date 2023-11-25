import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {EMPTY_URL, REMOTE_URL} from "./Calendar.const"
import {CalendarInterface} from "./Calendar.interface"
import {fetchCalendar} from "./Calendar.api";
import {RootState} from "../../_store/store";

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
        console.log("import calendar function")
        const response = await fetchCalendar(url, {headers: {"X-Requested-With": "XMLHttpRequest"}});
        return response.data;
    }
);


export const { deleteCalendar } = calendarSlice.actions;
export const selectCalendar = (state: RootState) => state.calendar.url;
export default calendarSlice.reducer;
