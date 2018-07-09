import { keys, keyOrder } from "./keys";
import formUpdatingErrorKey from "./form-updating-error-key";
import item from "./item";
import update from "./update";
import validatedForm from "./validated-form";
import valueForKey from "./value-for-key";

const typedValue = function (key) {
    let value = "";

    switch (key) {

    case keys.category:
        value = 0.75;
        break;
    
    case keys.coordinates:
        value = [];
        break;

    }

    return value;
};

const reducer = function (orderedKeys) {
    return orderedKeys.reduce(function (acc, current) {
        acc[current] = item(current, typedValue(current), "");
        return acc;
    }, {});
};

const form = reducer(keyOrder);

const formUpdatingDataKey = function (frm, key, value) {
    return update(frm, key, value);
};

const hasErrors = function (form) {
    return Object.keys(form)
        .map(key => form[key])
        .reduce(function (acc, current) {
            return (acc) ? true : (current.error.length > 0);
        }, false);
};

export default form;
export {
    formUpdatingDataKey,
    formUpdatingErrorKey,
    hasErrors,
    validatedForm,
    keyOrder,
    keys,
    item,
    valueForKey
};