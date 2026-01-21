import {createSlice, type PayloadAction,} from "@reduxjs/toolkit";
import type {IssuesState} from "../interfaces/issuesState";
import type {Issue} from "../interfaces/issue";


const initialState: IssuesState = {
    items: [],
};

export const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {
        setIssues(state, action: PayloadAction<Issue[]>) {
            state.items = action.payload;
        },
        clearIssues(state) {
            state.items = [];
        },
    },
});
export const {setIssues, clearIssues} = issuesSlice.actions;
export default issuesSlice.reducer;
