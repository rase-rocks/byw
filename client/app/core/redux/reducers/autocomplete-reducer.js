import { types } from "../actions";

const defaultState = {
    index: {
        words: [],
        tokens: {}
    },
    suggestion: ""
};

const autocompleteReducer = function (state = defaultState, action) {
    let reducedState = Object.assign({}, state);

    switch (action.type) {

    case types.setAutocompleteIndex: {
        reducedState.index = action.payload;
        break;
    }

    case types.setAutocompleteSuggestion: {
        reducedState.suggestion = action.payload;
        break;
    }

    }


    return reducedState;
};

export default autocompleteReducer;