import { keys, keyOrder } from "./keys";
import formUpdatingErrorKey from "./form-updating-error-key";
import item from "./item";
import update from "./update";
import validatedForm from "./validated-form";
import valueForKey from "./value-for-key";
import time from "../../../../../test/time";

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

const formFromLocation = function (location) {

    return Object.keys(location).reduce(function (acc, current) {
        return formUpdatingDataKey(acc, current, location[current]);
    }, reducer(keyOrder));
    
};

const formTimestamped = function (form, timestamp) {
    return update(form, keys.timestamp, timestamp);
};

export default form;
export {
    formUpdatingDataKey,
    formUpdatingErrorKey,
    formFromLocation,
    formTimestamped,
    hasErrors,
    validatedForm,
    keyOrder,
    keys,
    item,
    valueForKey
};