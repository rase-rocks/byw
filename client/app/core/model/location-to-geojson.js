/*
* GeoJSON RFC 7946 
* https://tools.ietf.org/html/rfc7946#section-1.4
*/

const locationCoordinatesToGeoJSONCoords = function (coordinates) {
    return [parseFloat(coordinates[1]), parseFloat(coordinates[0])];
};

const dataToGeoJson = function (location) {
    return {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": locationCoordinatesToGeoJSONCoords(location.coordinates)
        },
        "properties": {
            "name": location.name,
            "address": location.address,
            "category": location.category
        }
    };
};

export default dataToGeoJson;