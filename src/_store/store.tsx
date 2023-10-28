import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import calendarReducer from '../_components/Calendar/Calendar.slice';
import articleReducer from "../_reducers/articleReducer";

export const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        articles: articleReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
