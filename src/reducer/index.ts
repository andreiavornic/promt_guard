import {combineReducers} from 'redux';
import dismissReducer from "../features/dismissReducer.ts";
import historyReducer from "../features/historyReducer.ts";
import issuesReducer from "../features/issuesReducer.ts";
import controllerReducer from "../features/controllerReducer.ts";

export const rootReducer = combineReducers({
    controller: controllerReducer,
    issues: issuesReducer,
    history: historyReducer,
    dismiss: dismissReducer,
});

export default rootReducer;
