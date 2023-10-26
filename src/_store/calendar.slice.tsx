import {createSlice} from '@reduxjs/toolkit';

// create slice

const name = 'calendar';
const initialState = createInitialState();
const reducers = createReducers();
const slice = createSlice({ name, initialState, reducers });

// exports

export const calendarActions = { ...slice.actions };
export const calendarReducer = slice.reducer;


// implementation

function createInitialState() {
    return {
        url: null
    }
}


function createReducers() {
    return {
        getICS: getICS()
    };

    function getICS (state, content: string) {
        if (state.value == "loaded") {
            return getContent(content)
        }
    }

    async function getContent (remoteURL: string) {
        const response = await fetch(remoteURL, {headers: {"X-Requested-With": "XMLHttpRequest"}})
        const blob = await response.blob()
        return URL.createObjectURL(blob)
    }

}
