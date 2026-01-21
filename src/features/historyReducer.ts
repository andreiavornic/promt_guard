import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Issue {
    id: string;
    emails: string[];
    createdAt: number;
}

interface HistoryState {
    items: Issue[];
}

const initialState: HistoryState = {
    items: [],
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addIssue(state, action: PayloadAction<Issue>) {
            state.items.push(action.payload);
        },
    },
});

export const { addIssue } = historySlice.actions;
export default historySlice.reducer;
