import { combineReducers } from "redux";

import settingsReducer from "./settings-reducer";
import dataReducer from "./data-reducer";
import autocompleteReducer from "./autocomplete-reducer";
import formReducer from "./form-reducer";

const reducers = combineReducers({
    settings: settingsReducer,
    data: dataReducer,
    autocomplete: autocompleteReducer,
    form: formReducer
});

export default reducers;