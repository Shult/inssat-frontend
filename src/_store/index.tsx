import { configureStore } from '@reduxjs/toolkit';

import { calendarReducer } from './calendar.slice';

export * from './calendar.slice';

export const store = configureStore({
    reducer: {
        calendar: calendarReducer
    },
});
