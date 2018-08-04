import { types, setLocationsAction, setFilteredLocationsAction } from "../actions";
import arraySample from "../../model/array-sample";

const key = "LOCATIONS";

const sentRequests = {};

const updateSentRequests = function (cache) {
    return function (locations) {
        cache[key] = true;
        return locations;
    };
};

const pick = function (locations, count = 10) {

    const chosen = {};
    const results = [];
    
    while (results.length < count) {
        const candidate = arraySample(locations);
        if (!chosen[candidate.coordinateHash]) {
            results.push(candidate);
            chosen[candidate.coordinateHash] = candidate;
        }
    }

    return results;
};

const dispatchLocationsTo = function (store) {
    return function (locations) {
        store.dispatch(setLocationsAction(locations));

        const randomResults = pick(locations, 10);

        store.dispatch(setFilteredLocationsAction(randomResults));

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