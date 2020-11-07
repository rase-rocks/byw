import { types } from "../actions";
import languages from "../../text/supported-languages";

const defaultState = {
    language: languages.cymraeg,
};

const settingsReducer = function (state = defaultState, action) {
    let reducedState = Object.assign({}, state);

    switch (action.type) {

        case types.setLanguage: {
            reducedState.language = action.payload;
            break;
        }

    }

    return reducedState;
};

export default settingsReducer;