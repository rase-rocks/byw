import { keys } from "../keys";
import { postcodeRe, coordinateRe } from "../../regular-expressions";
import errors from "../error-messages";
import formUpdatingErrorKey from "../form-updating-error-key";
import valueForKey from "../value-for-key";

const hasPostcode = function (form) {
    return (valueForKey(form, keys.postcode).length > 1);
};

const hasCoordinates = function (form) {
    return (valueForKey(form, keys.coordinates).length > 1);
};

const postcodeValidator = function (form) {

    const postcode = valueForKey(form, keys.postcode);

    return (postcode.match(postcodeRe))
        ? form
        : (hasCoordinates(form))
            ? (postcode.length == 0)
                ? form
                : formUpdatingErrorKey(form, keys.postcode, errors.invalidPostcodeWithCoordinates)
            : formUpdatingErrorKey(form, keys.postcode, errors.invalidPostcodeWithoutCoordinates);
};

const coordinateValidator = function (form) {

    const coordinates = valueForKey(form, keys.coordinates);

    return (coordinates.match(coordinateRe))
        ? form
        : (hasPostcode(form))
            ? (coordinates.length == 0) 
                ? form
                : formUpdatingErrorKey(form, keys.coordinates, errors.invalidCoordinatesWithPostcode)
            : formUpdatingErrorKey(form, keys.coordinates, errors.invalidCoordinatesWithoutPostcode);
    
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
    return category && category.length > 1;
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