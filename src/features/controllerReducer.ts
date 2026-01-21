import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {ControllerState} from "../interfaces/controllerState.ts";

const initialState: ControllerState = {
    activeTab: 'issues',
};

const controllerSlice = createSlice({
    name: 'controller',
    initialState,
    reducers: {
        setTab(state, action: PayloadAction<ControllerState['activeTab']>) {
            state.activeTab = action.payload;
        }
    },
});

export const {setTab} = controllerSlice.actions;
export default controllerSlice.reducer;
