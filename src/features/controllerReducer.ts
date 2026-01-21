import {createSlice} from '@reduxjs/toolkit';

interface ControllerState {
    isIssues: boolean;
}

const initialState: ControllerState = {
    isIssues: true,
};

const controllerSlice = createSlice({
    name: 'controller',
    initialState,
    reducers: {
        switchTabs(state) {
            state.isIssues = !state.isIssues;
        }
    },
});

export const {switchTabs} = controllerSlice.actions;
export default controllerSlice.reducer;
