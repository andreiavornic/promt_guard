import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {HistoryState} from "../interfaces/historyState.ts";
import type {Issue} from "../interfaces/issue.ts";


const initialState: HistoryState = {
    items: [],
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHistory(state, action: PayloadAction<Issue[]>) {
            state.items = action.payload;
        },
        addIssue(state, action: PayloadAction<Issue>) {
            state.items.push(action.payload);
        },
    },
});

export const {setHistory, addIssue} = historySlice.actions;
export default historySlice.reducer;
