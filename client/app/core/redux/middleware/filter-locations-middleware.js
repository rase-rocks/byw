import { types, setFilteredLocationsAction } from "../actions";
import coordinatesGetter from "../../model/coordinates-getter";
import filterLocations from "../../model/filter-locations";
import filterPolygon from "../../model/filter-locations/filter-polygon";

const dispatchTo = function (store) {
    return function (locations) {
        store.dispatch(setFilteredLocationsAction(locations));
    };
};

const getLocations = function (state) {
    return state.data.locations;
};

const filter = function (api, store, filterString, filterDistance = 10) {
    filterLocations(api, getLocations(store.getState()), filterString, filterDistance)
        .then(dispatchTo(store));
};

export default function makeFilterLocationsMiddleware(api) {
    return store => next => action => {

        switch (action.type) {

            case types.filterLocations: {

                const { filterString, filterDistance } = action.payload;
                if (!filterString || filterString.length < 3) { break; } // Only filter if there is 3 or more chars

                filter(api, store, filterString, filterDistance);

                break;
            }

            case types.setSearchText: {
                if (action.payload.length < 3) { break; }
                filter(api, store, action.payload);
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