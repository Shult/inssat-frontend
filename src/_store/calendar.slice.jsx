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

    async function getICS() {

        const remoteURL = 'https://planning.univ-rennes1.fr/jsp/custom/modules/plannings/NYa47j3l.shu'

        const response = await fetch(remoteURL);
        const blob = await response.blob();

        return URL.createObjectURL(blob);
    }
}
