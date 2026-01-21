import {createSlice, type PayloadAction,} from "@reduxjs/toolkit";

interface IssuesState {
    currentIssues: string[];
}

const initialState: IssuesState = {
    currentIssues: [],
};

export const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {
        setIssues(state, action: PayloadAction<string[]>) {
            state.currentIssues = action.payload;
        },
        clearIssues(state) {
            state.currentIssues = [];
        },
    },
});

export default issuesSlice.reducer;
