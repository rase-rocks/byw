import { combineReducers } from "redux";

import settingsReducer from "./settings-reducer";
import dataReducer from "./data-reducer";
import formReducer from "./form-reducer";
import locatorReducer from "./locator-reducer";

const reducers = combineReducers({
    settings: settingsReducer,
    data: dataReducer,
    form: formReducer,
    locator: locatorReducer
});

export default reducers;