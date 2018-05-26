import { types, setFilteredLocationsAction } from "../actions";
import filterLocations from "../../model/filter-locations";
import filterPolygon from "../../model/filter-locations/filter-polygon";
import coordinatesGetter from "../../model/coordinates-getter";

const dispatchTo = function (store) {
    return function (locations) {
        store.dispatch(setFilteredLocationsAction(locations));
    };
};

const getLocations = function (state) {
    return state.data.locations;
};

export default function makeFilterLocationsMiddleware(api) {
    return store => next => action => {

        switch (action.type) {

        case types.filterLocations: {

            const { filterString, filterDistance } = action.payload;
            if (!filterString || filterString.length < 3) { break; } // Only filter if there is 3 or more chars

            filterLocations(api, getLocations(store.getState()), filterString, filterDistance)
                .then(dispatchTo(store));

            break;
        }

        case types.filterLocationsByPolygon: {

            filterPolygon(action.payload, getLocations(store.getState()), coordinatesGetter)
                .then(dispatchTo(store));

            break;

        }

        }

        return next(action);
    };
}