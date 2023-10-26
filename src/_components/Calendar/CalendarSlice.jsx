import { createSlice } from '@reduxjs/toolkit'


const initialCalendarState = {
    status: 'Idle',
    data: null,
    error: null
}
/**
export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: initialCalendarState,
    reducers: {
        fetchICal: (url) => {
            fetch(url)
                .then(response => response.blob())
                .then(blob =>
                    url = URL.createObjectURL(blob)
                )
                .catch((err) =>

                )
        }
    }
})**/

// Action creators are generated for each case reducer function
export const { fetchICal } = calendarSlice.actions

export default calendarSlice.reducer
