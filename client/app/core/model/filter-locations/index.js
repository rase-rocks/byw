import { postcodeRe, coordinateRe } from "../regular-expressions";
import filterCoordinates from "./filter-coordinates";
import filterPostcodes from "./filter-postcodes";
import filterText from "./filter-text";

export const tests = [
    {
        re: postcodeRe,
        filter: filterPostcodes,
        name: "Postcodes"
    },
    {
        re: coordinateRe,
        filter: filterCoordinates,
        name: "Coordinates"
    }
];

export const match = function (filterString) {
    return function (test) {
        const matches = filterString.match(test.re);
        if (!matches || matches == null || matches.length == 0) { return false; }
        return true;
    };
};

const filterForSearch = function (filterString) {
    const filterTypes = tests.filter(match(filterString));
    return (filterTypes.length > 0) ? filterTypes[0].filter : filterText;
};

const filterLocations = function (api, locations, filterString, distance = 25) {
    return new Promise(function (resolve) {

        filterForSearch(filterString)(api, filterString, locations, distance)
            .then(resolve);

    });
};

export default filterLocations;