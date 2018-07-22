import { encodeGeoJsonCoordinates } from "../../geo-hash";
import { keys } from "../keys";
import { postcodeRe, coordinateDecimalPart } from "../../regular-expressions";
import errors from "../error-messages";
import formUpdatingErrorKey from "../form-updating-error-key";
import valueForKey from "../value-for-key";

const coordinateHashValidator = function (form) {
    const coordinates = valueForKey(form, keys.coordinates);
    const expectedHash = encodeGeoJsonCoordinates(coordinates);
    const currentHash = valueForKey(form, keys.coordinateHash);

    return (expectedHash === currentHash)
        ? form
        : formUpdatingErrorKey(form, keys.coordinates, errors.coordinatesMismatch);
};

const postcodeValidator = function (form) {

    const postcode = valueForKey(form, keys.postcode);

    return (postcode === "")
        ? form
        : (postcode.match(postcodeRe))
            ? form
            : formUpdatingErrorKey(form, keys.postcode, errors.invalidPostcode);
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

const coordinateSuitableValueReducer = function (acc, coordinateValue) {

    if (!acc) { return false; }

    const coordStr = `${coordinateValue}`;
    const parts = coordStr.split(".");

    return (parts.length !== 2)
        ? false
        : (parts[1].length < 3)
            ? false
            : parts[1].match(coordinateDecimalPart);
};

const coordinateTest = function (coordinates) {
    return coordinates &&
        Array.isArray(coordinates) &&
        coordinates.length === 2 &&
        coordinates.reduce(coordinateSuitableValueReducer, true);
};

const validators = [
    coordinateHashValidator,
    makeValidator(nameTest, keys.name, errors.missingName),
    makeValidator(addressTest, keys.address, errors.missingAddress),
    postcodeValidator,
    makeValidator(coordinateTest, keys.coordinates, errors.invalidCoordinates),
    makeValidator(categoryTest, keys.category, errors.missingCategory)
];

const validatedForm = function (form) {
    return validators.reduce(function (result, validator) {
        return validator(result);
    }, Object.assign({}, form));
};

export default validatedForm;