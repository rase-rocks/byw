import { types } from "../actions";

const defaultLocatorState = {
    searchText: "",
    coordinate: [-3.418375, 52.453650]
};

const locatorReducer = function (state = defaultLocatorState, action) {
    let reducedState = Object.assign({}, state);

    switch (action.type) {

    case types.setLocatorSearchText: {
        reducedState.searchText = action.payload;
    }

    }

    return reducedState;
};

export default locatorReducer;