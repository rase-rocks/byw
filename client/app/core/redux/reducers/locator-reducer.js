import { types } from "../actions";

const defaultLocatorState = {
    searchText: "",
    coordinate: [-3.706885, 52.94863303],
    zoom: 10,
    showsLocatorMarker: true
};

const locatorReducer = function (state = defaultLocatorState, action) {
    let reducedState = Object.assign({}, state);

    switch (action.type) {

        case types.setLocatorSearchText:

            reducedState.searchText = action.payload;
            break;

        case types.setLocatorCoordinate:

            reducedState.coordinate = action.payload;
            break;

        case types.setSearchText:

            reducedState.searchText = action.payload;
            break;

        case types.setViewLocation:

            reducedState.coordinate = action.payload.coordinates;
            reducedState.zoom = 18;
            reducedState.showsLocatorMarker = false;
            break;

        case types.clearForm:
        
            reducedState.showsLocatorMarker = true;
            break;
    }

    return reducedState;
};

export default locatorReducer;