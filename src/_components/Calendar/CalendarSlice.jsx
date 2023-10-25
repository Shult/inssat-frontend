import { createSlice } from '@reduxjs/toolkit'


initialCalendar

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        value: "",
    },
    reducers: {
        fetchICal: (url) => {
            const response = fetch(url);
            const blob = response.blob();
            URL.createObjectURL(blob);
        }
    }
})

// Action creators are generated for each case reducer function
export const { fetchICal } = calendarSlice.actions

export default calendarSlice.reducer
