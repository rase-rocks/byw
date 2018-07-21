import { formUpdatingDataKey, formFromLocation } from "../../model/form";
import { keys } from "../../model/form/keys";
import { types } from "../actions";
import form from "../../model/form";
import { encodeGeoJsonCoordinates } from "../../model/geo-hash";

const updater = function (state, key, value) {
    const form = formUpdatingDataKey(state, key, value);
    if (key !== keys.coordinates) { return form; }

    const coordinateHash = encodeGeoJsonCoordinates(value);

    return formUpdatingDataKey(form, keys.coordinateHash, coordinateHash);
};

const formReducer = function (state = form, action) {
    let reducedState = Object.assign({}, state);

    switch (action.type) {

    case types.setFormData:

        reducedState = updater(reducedState, action.payload.key, action.payload.value);
        break;


    case types.updateForm:

        reducedState = action.payload;
        break;

    case types.clearForm:

        reducedState = Object.assign({}, form);
        break;

    case types.setViewLocation:

        reducedState = formFromLocation(action.payload);
        break;

    }
    
    return reducedState;
};

export default formReducer;