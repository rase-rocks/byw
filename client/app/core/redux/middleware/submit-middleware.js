import { types, updateFormAction, setFormDataAction } from "../actions";

import { validatedForm, hasErrors, keys } from "../../model/form";

const validate = function (store) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            const form = store.getState().form;
            const vForm = validatedForm(form);
            resolve(vForm);
        }, 10);

    });
};

const handle = function (dispatch) {
    return function (processedForm) {
        if (hasErrors(processedForm)) {
            dispatch(updateFormAction(processedForm));
            return;
        }

        console.log("Submit:", processedForm);

    };
};

const handleReverseGeocode = function (dispatch) {
    return function (postcode) {
        if (!postcode || postcode === null) { return; }
        dispatch(setFormDataAction(keys.postcode, postcode));
    };
};

export default function makeSubmitMiddleware(api) {
    return store => next => action => {

        switch (action.type) {

        case types.submitForm:
            validate(store)
                .then(handle(store.dispatch, api));
            break;

        case types.setFormData:
            if (action.payload.key !== keys.coordinates) { break; }

            api.reverseGeocode(action.payload.value)
                .then(handleReverseGeocode(store.dispatch));
            break;
        }

        return next(action);
    };
}