import filterCoordinates from "./filter-coordinates";
import arrayReversed from "../../../core/model/array-reversed";

// The coordinates returned from geocodePostcode are in GeoJson order
// but the filterCoordinates method is also used to find coordinates
// the user has entered, most likely in lat/lng format, so has to 
// be reversed

const filterPostcodes = function (api, string, locations, distance) {
    return api.geocodePostcode(string)
        .then(function (coordinates) {
            return filterCoordinates(api, arrayReversed(coordinates).join(","), locations, distance);
        })
        .catch(function(err) {
            console.log(`Unable to find any record of ${string}\n${err}`);
            return [];
        });
};

export default filterPostcodes;