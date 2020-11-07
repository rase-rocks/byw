import {
    types,
    updateFormAction,
    setFormDataAction,
    addSubmissionAction,
    updateSubmissionStatusAction
} from "../actions";
import { validatedForm, 
    hasErrors, 
    keys, 
    postDataFromForm 
} from "../../model/form";
import { submissionStates } from "../reducers/submission-reducer";

import allText from "../../text/data";

function validationValues(store) {
    const { form, settings } = store.getState();
    const text = allText[settings.language];
    return {
        form,
        text
    };
}

const validate = function (store) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            
            const { form, text } = validationValues(store);
            const vForm = validatedForm(form, text);
            resolve(vForm);

        }, 10);

    });
};

const submitSuccess = function (dispatch, postData) {
    return function () {
        dispatch(updateSubmissionStatusAction(postData, submissionStates.success));
    };
};

const submitFail = function (dispatch, postData) {
    return function () {
        dispatch(updateSubmissionStatusAction(postData, submissionStates.failure));
    };
};

const handle = function (dispatch, api) {
    return function (candidateForm) {

        if (hasErrors(candidateForm)) {
            dispatch(updateFormAction(candidateForm));
            return;
        }

        const postData = postDataFromForm(candidateForm);

        setTimeout(function () {
            dispatch(addSubmissionAction(postData));
        }, 0);

        api.submit(postData)
            .then(submitSuccess(dispatch, postData))
            .catch(submitFail(dispatch, postData));

    };
};

const handleReverseGeocode = function (dispatch) {
    return function (postcode) {
        const value = (postcode && postcode !== null) ? postcode : "";
        dispatch(setFormDataAction(keys.postcode, value));
    };
};

export { validate };

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