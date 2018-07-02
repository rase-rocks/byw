import { types } from "../actions";

const defaultState = {
    needsUpdate: true,
    locations: [],
    filteredResults: [],
    selectedLocation: undefined,
    searchText: ""
};

const dataReducer = function (state = defaultState, action) {
    let reducedState = Object.assign({}, state);

    switch (action.type) {

    case types.setLocations: {

        reducedState.needsUpdate = false;
        reducedState.locations = action.payload;
        break;

    }

    case types.setSearchText: {

        reducedState.searchText = action.payload;
        break;
        
    }

    case types.setFilteredLocations: {

        reducedState.filteredResults = action.payload;
        reducedState.selectedLocation = undefined;
        break;

    }

    case types.setViewLocation: {

        reducedState.selectedLocation = action.payload;
        break;

    }

    }

    return reducedState;
};

export default dataReducer;