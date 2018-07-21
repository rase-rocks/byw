import { types, setLocationsAction } from "../actions";
import { addCoordinates } from "../../model/geo-hash";

const key = "LOCATIONS";

const sentRequests = {};

const updateSentRequests = function (cache) {
    return function (locations) {
        cache[key] = true;
        return locations;
    };
};

const dispatchLocationsTo = function (store) {
    return function (rawLocations) {
        const locations = rawLocations.map(addCoordinates);
        store.dispatch(setLocationsAction(locations));
    };
};

export default function makeRequestLocationsMiddleware(api) {
    return store => next => action => {

        switch (action.type) {

        case types.requestLocations: {

            if (sentRequests[key]) {
                break;
            }

            api
                .locations()
                .then(updateSentRequests(sentRequests))
                .then(dispatchLocationsTo(store));

            break;
        }

        }


        return next(action);
    };
}