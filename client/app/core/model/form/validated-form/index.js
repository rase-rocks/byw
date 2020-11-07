import { encodeGeoJsonCoordinates } from "../../geo-hash";
import { keys } from "../keys";
import { postcodeRe, coordinateDecimalPart } from "../../regular-expressions";
import errorKeys from "../error-message-keys";
import formUpdatingErrorKey from "../form-updating-error-key";
import valueForKey from "../value-for-key";

import text from "../../../text/data";
import supportedLanguages from "../../../text/supported-languages";

const defaultText = text[supportedLanguages.english];

const makeCoordinateHashValidator = function(errorMessageKey) {
    return function (form, text) {
        const coordinates = valueForKey(form, keys.coordinates);
        const expectedHash = encodeGeoJsonCoordinates(coordinates);
        const currentHash = valueForKey(form, keys.coordinateHash);
    
        return (expectedHash === currentHash)
            ? form
            : formUpdatingErrorKey(form, keys.coordinates, text[errorMessageKey]);
    };
};

const makeValidator = function (test, key, errorMessageKey) {
    return function (form, text) {
        const value = valueForKey(form, key);
        return (test(value)) ? form : formUpdatingErrorKey(form, key, text[errorMessageKey]);
    };
};

const nameTest = function (name) {
    return name !== undefined && name.length > 1;
};

const addressTest = function (address) {
    return address && address.length > 1;
};

const postcodeTest = function(postcode) {
    return postcode === "" || postcode.match(postcodeRe);
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
    makeCoordinateHashValidator(errorKeys.coordinatesMismatch),
    makeValidator(nameTest, keys.name, errorKeys.missingName),
    makeValidator(addressTest, keys.address, errorKeys.missingAddress),
    makeValidator(postcodeTest, keys.postcode, errorKeys.invalidPostcode),
    makeValidator(coordinateTest, keys.coordinates, errorKeys.invalidCoordinates),
    makeValidator(categoryTest, keys.category, errorKeys.missingCategory)
];

const validatedForm = function (form, text = defaultText) {
    return validators.reduce(function (result, validator) {
        return validator(result, text);
    }, Object.assign({}, form));
};

export default validatedForm;