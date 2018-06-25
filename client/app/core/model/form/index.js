import {keys, keyOrder} from "./keys";
import formUpdatingErrorKey from "./form-updating-error-key";
import item from "./item";
import update from "./update";
import validatedForm from "./validated-form";
import valueForKey from "./value-for-key";

const reducer = function (keys) {
    return keys.reduce(function (acc, current) {
        acc[current] = item(current, "", "");
        return acc;
    }, {});
};

const form = reducer(keyOrder);

const formUpdatingDataKey = function(frm, key, value) {
    return update(frm, key, value);
};

export default form;
export { 
    formUpdatingDataKey,
    formUpdatingErrorKey, 
    validatedForm,
    keyOrder, 
    keys, 
    item, 
    valueForKey };