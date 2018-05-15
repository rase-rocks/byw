import { types, setLocationsAction } from "../actions";
import makeApiClient from "../../api-client";
//import toGeoJSON from "../../model/location-to-geojson";

const api = makeApiClient(fetch);

const key = "LOCATIONS";

const sentRequests = {};

const updateSentRequests = function (cache) {
    return function (locations) {
        cache[key] = true;
        return locations;
    };
};

// const mapLocationsToGeoJSON = function (locations) {
//     return locations.map(location => toGeoJSON(location));
// };

const dispatchLocationsTo = function (store) {
    return function (locations) {
        store.dispatch(setLocationsAction(locations));
    };
};

export default store => next => action => {

    switch (action.type) {

    case types.requestLocations: {

        if (sentRequests[key]) {
            break;
        }

        api
            .locations()
            .then(updateSentRequests(sentRequests))
            //.then(mapLocationsToGeoJSON)
            .then(dispatchLocationsTo(store));

        break;
    }

    }


    return next(action);
};