import { types } from "../actions";
import form from "../../model/form";
import { formUpdatingDataKey } from "../../model/form";


const formReducer = function (state = form, action) {
    let reducedState = Object.assign({}, state);

    switch (action.type) {

    case types.setFormData:
        reducedState = formUpdatingDataKey(reducedState, action.payload.key, action.payload.value);

    }

    return reducedState;
};

export default formReducer;