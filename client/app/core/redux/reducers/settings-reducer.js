import { types } from "../actions";

const languages = {
    english: "english",
    cymraeg: "cymraeg"
};

const defaultState = {
    language: languages.english
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
export { languages };