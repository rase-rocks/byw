import filterText from "./filter-text";
import filterCoordinates from "./filter-coordinates";
import filterPostcodes from "./filter-postcodes";

export const tests = [
    {
        re: /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/i,
        filter: filterPostcodes,
        name: "Postcodes"
    },
    {
        re: /(-?\d+\.{1}\d+,{1})\s?(-?\d+\.{1}\d+)/,
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