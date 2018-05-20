import { types, setFilteredLocationsAction } from "../actions";
import filterLocations from "../../model/filter-locations";

const dispatchTo = function (store) {
    return function (locations) {
        store.dispatch(setFilteredLocationsAction(locations));
    };
};

export default function makeFilterLocationsMiddleware(api) {
    return store => next => action => {

        switch (action.type) {

        case types.filterLocations: {

            const filterString = action.payload;
            if (!filterString || filterString.length < 4) { break; } // Only filter if there is 4 or more chars

            filterLocations(api, store.getState().data.locations, filterString)
                .then(dispatchTo(store));

            break;
        }

        }

        return next(action);
    };
}