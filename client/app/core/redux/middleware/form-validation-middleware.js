import { types } from "../actions";

export default function makeRequestLocationsMiddleware() {
    return store => next => action => {

        switch (action.type) {

        case types.requestFormValidation:
            console.log("submit");
            break;
            
        }
        return next;
    };
}