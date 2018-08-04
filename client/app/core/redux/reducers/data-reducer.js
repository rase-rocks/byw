import { types } from "../actions";
import locationsContainsLocation from "../../model/locations-contains-location";
import locationUpdateCategory from "../../model/location-update-category";

const defaultState = {
    needsUpdate: true,
    locations: [],
    filteredResults: [],
    selectedLocation: undefined,
    searchText: ""
};

const locationUpdate = function (submission) {
    return function (location) {
        if (submission.coordinateHash === location.coordinateHash) {
            return locationUpdateCategory(location, submission.category);
        } else {
            return location;
        }
    };
};

const updateLocation = function (locations, location) {
    const index = locationsContainsLocation(locations, location);

    return (index !== undefined) 
        ? locations.map(locationUpdate(location))
        : [...locations, location];
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
            reducedState.filteredResults = [action.payload];
            break;

        }

        case types.addSubmission: {
            
            const submission = action.payload;
            reducedState.locations = updateLocation(reducedState.locations, submission);
            reducedState.filteredResults = updateLocation(reducedState.filteredResults, submission);
            break;
        }

    }

    return reducedState;
};

export default dataReducer;