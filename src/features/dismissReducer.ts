import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface DismissState {
    dismissed: Record<string, number>;
}

const initialState: DismissState = {
    dismissed: {},
};

const dismissSlice = createSlice({
    name: 'dismiss',
    initialState,
    reducers: {
        dismissEmail(
            state,
            action: PayloadAction<{ email: string; until: number }>
        ) {
            state.dismissed[action.payload.email] = action.payload.until;
        },
        clearDismiss(state, action: PayloadAction<string>) {
            delete state.dismissed[action.payload];
        },
    },
});

export const { dismissEmail, clearDismiss } = dismissSlice.actions;
export default dismissSlice.reducer;
