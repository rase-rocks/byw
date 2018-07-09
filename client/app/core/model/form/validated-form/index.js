import { keys } from "../keys";
import { postcodeRe } from "../../regular-expressions";
import errors from "../error-messages";
import formUpdatingErrorKey from "../form-updating-error-key";
import valueForKey from "../value-for-key";

const postcodeValidator = function (form) {

    const postcode = valueForKey(form, keys.postcode);

    return (postcode === "") 
        ? form
        : (postcode.match(postcodeRe))
            ? form
            : formUpdatingErrorKey(form, keys.postcode, errors.invalidPostcode);
};

const coordinateValidator = function (form) {

    const coordinates = valueForKey(form, keys.coordinates);
    
    return (coordinates && coordinates.length === 2)
        ? form
        : formUpdatingErrorKey(form, keys.coordinates, errors.invalidCoordinates);
};

const makeValidator = function (test, key, errorMessage) {
    return function (form) {
        const value = valueForKey(form, key);
        return (test(value)) ? form : formUpdatingErrorKey(form, key, errorMessage);
    };
};

const nameTest = function (name) {
    return name !== undefined && name.length > 1;
};

const addressTest = function (address) {
    return address && address.length > 1;
};

const categoryTest = function (category) {
    return category && typeof category === "number";
};

const validators = [
    makeValidator(nameTest, keys.name, errors.missingName),
    makeValidator(addressTest, keys.address, errors.missingAddress),
    postcodeValidator,
    coordinateValidator,
    makeValidator(categoryTest, keys.category, errors.missingCategory)
];

const validatedForm = function (form) {
    return validators.reduce(function (result, validator) {
        return validator(result);
    }, Object.assign({}, form));
};

export default validatedForm;