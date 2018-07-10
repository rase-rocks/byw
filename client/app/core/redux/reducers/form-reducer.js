import { types } from "../actions";
import form from "../../model/form";
import { formUpdatingDataKey, formFromLocation } from "../../model/form";

const formReducer = function (state = form, action) {
    let reducedState = Object.assign({}, state);
    
    switch (action.type) {

    case types.setFormData:

        reducedState = formUpdatingDataKey(reducedState, action.payload.key, action.payload.value);
        break;
    

    case types.updateForm:

        reducedState = action.payload;
        break;
    
    case types.setViewLocation:

        reducedState = formFromLocation(action.payload);
        break;

    }

    return reducedState;
};

export default formReducer;