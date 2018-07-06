import { combineReducers } from "redux";

import settingsReducer from "./settings-reducer";
import dataReducer from "./data-reducer";
import formReducer from "./form-reducer";

const reducers = combineReducers({
    settings: settingsReducer,
    data: dataReducer,
    form: formReducer
});

export default reducers;