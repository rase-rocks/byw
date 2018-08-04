import locationNotEqual from "./location-not-equal";

const locationsContainsLocation = function (locations = [], location) {

    let result = undefined;

    for (let i = 0; i < locations.length; i++) {
        const candidate = locations[i];
        if (!locationNotEqual(candidate, location)) {
            result = i;
            break;
        }
    }

    return result;
};

export default locationsContainsLocation;