import { types } from "../actions";

const defaultState = {
    needsUpdate: true,
    locations: [],
    filteredResults: []
};

const dataReducer = function (state = defaultState, action) {
    let reducedState = Object.assign({}, state);

    switch (action.type) {

    case types.setLocations: {
        reducedState.needsUpdate = false;
        reducedState.locations = action.payload;
        break;
    }

    case types.setFilteredLocations: {
        reducedState.filteredResults = action.payload;
        break;
    }

    }

    return reducedState;
};

export default dataReducer;