import { configureStore } from '@reduxjs/toolkit'
import calendarReducer from "../_components/Calendar/Calendar";

export default configureStore({
    reducer: {
        calendar: calendarReducer,
    },
})
