import {createSlice} from '@reduxjs/toolkit'
import {CalendarInterface} from "./Calendar.interface"
import {RootState} from "../../_store/store";
import UserServices from "../../services/UserServices";
import config from '../../config.json';
const URL = config.development.API_URL;

const initialState: CalendarInterface = {
    url: "",
    status: 'idle'
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        loadCalendar: (state) => {
            // state.url = "https://api.dapi-services.fr/ade/"+UserServices.getTokenParsed()?.["ade_link"];
            state.url = `${URL}/ade/`+UserServices.getTokenParsed()?.["ade_link"];

        }
    },
})

export const { loadCalendar } = calendarSlice.actions;
export const selectCalendar = (state: RootState) => state.calendar.url;
export default calendarSlice.reducer;
