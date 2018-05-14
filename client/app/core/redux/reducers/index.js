import { combineReducers } from "redux";

import settingsReducer from "./settings-reducer";
import dataReducer from "./data-reducer";

const reducers = combineReducers({
    settings: settingsReducer,
    data: dataReducer 
});

export default reducers;