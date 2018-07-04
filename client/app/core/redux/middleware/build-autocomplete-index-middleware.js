import { 
    types, 
    setAutocompleteIndexAction, 
    setAutocompleteSuggestionAction 
} from "../actions";

import { makeIndex, getWord } from "../../model/autocomplete";

const dispatchIndex = function (toStore) {
    return function (index) {
        toStore.dispatch(setAutocompleteIndexAction(index));
    };
};

const dispatchSuggestion = function (toStore) {
    return function (suggestion) {
        toStore.dispatch(setAutocompleteSuggestionAction(suggestion));
    };
};

export default function makeBuildAutocompleteIndexMiddleware() {
    
    return store => next => action => {
        
        switch (action.type) {

        case types.setLocations: {
            makeIndex(action.payload)
                .then(dispatchIndex(store));
            break;
        }

        case types.setSearchText: {
            const index = store.getState().autocomplete.index;
            getWord(action.payload, index)
                .then(dispatchSuggestion(store));
            break;
        }

        }

        return next(action);
    };
}