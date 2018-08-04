import { keys } from "../../model/form";
import { types, setLocatorCoordinateAction, setFormDataAction } from "../actions";
import locationsContainsCoordinate from "../../model/locations-contains-coordinate";

const shiftCoordinate = function (coordinate, by = 0.0001) {
    const c = [...coordinate];
    c[0] += by;
    return c;
};

const validateCoordinate = function (store, coordinate) {

    const locations = store.getState().data.locations;
    const precision = 8;
    const radius = 0.05;

    if (!locationsContainsCoordinate(locations, coordinate, precision, radius)){
        store.dispatch(setFormDataAction(keys.coordinates, coordinate));
        return;
    }
    
    let candidate = coordinate;
    setTimeout(function () {
        
        do {
            candidate = shiftCoordinate(candidate, 0.00005);
        } while (locationsContainsCoordinate(locations, candidate, precision, radius));

        store.dispatch(setLocatorCoordinateAction(candidate));

    }, 100);
};

export default function makeLocatorMiddleware() {
    return store => next => action => {

        switch (action.type) {

            case types.setLocatorCoordinate: {
                validateCoordinate(store, action.payload);
                break;
            }

            case types.clearForm: {
                const coordinate = store.getState().locator.coordinate;
                validateCoordinate(store, coordinate);
                break;
            }

        }

        return next(action);
    };
}