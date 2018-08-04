import { makeFilter } from "../geodesic";
import arrayReversed from "../array-reversed";
import getter from "../coordinates-getter";

const makeBasePoint = function (string) {
    return {
        coordinates: arrayReversed(string.split(",").map(str => str.trim()))
    };
};

const filterCoordinates = function (api, string, locations, distance) {
    return new Promise(function (resolve) {

        const basePoint = makeBasePoint(string);
        
        const filter = makeFilter(basePoint, distance, getter);
        const filteredLocations = locations.filter(filter);
        
        resolve(filteredLocations);
    });
};

export default filterCoordinates;