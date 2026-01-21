import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface DismissState {
    dismissed: boolean;
    timer: number | null;
    loaded: boolean;
}

const initialState: DismissState = {
    dismissed: false,
    timer: null,
    loaded: false
};

export const loadDismissState = createAsyncThunk(
    'dismiss/loadState',
    async () => {
        const result = await chrome.storage.local.get(['guardDismissed', 'guardDismissUntil']);
        return {
            dismissed: result.guardDismissed ?? false,
            timer: result.guardDismissUntil ?? null
        };
    }
);

const dismissSlice = createSlice({
    name: 'dismiss',
    initialState,
    reducers: {
        dismissGuard(state) {
            const expireTime = Date.now() + 24 * 60 * 60 * 1000;
            state.dismissed = true;
            state.timer = expireTime;
            chrome.storage.local.set({
                guardDismissed: true,
                guardDismissUntil: expireTime
            });
        },
        activateGuard(state) {
            state.dismissed = false;
            state.timer = null;
            chrome.storage.local.remove(['guardDismissed', 'guardDismissUntil']);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadDismissState.fulfilled, (state, action) => {
            const { dismissed, timer } = action.payload;

            if (timer && Date.now() >= timer) {
                state.dismissed = false;
                state.timer = null;
                chrome.storage.local.remove(['guardDismissed', 'guardDismissUntil']);
            } else {
                state.dismissed = dismissed;
                state.timer = timer;
            }
            state.loaded = true;
        });
    }
});

export const { dismissGuard, activateGuard } = dismissSlice.actions;
export default dismissSlice.reducer;
