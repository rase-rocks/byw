import { combineReducers } from "redux";

import settingsReducer from "./settings-reducer";

const reducers = combineReducers({
    settings: settingsReducer
});

export default reducers;