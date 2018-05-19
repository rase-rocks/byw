/*
* GeoJSON RFC 7946 
* https://tools.ietf.org/html/rfc7946#section-1.4
*/

const dataToGeoJson = function (location) {
    return {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": location.coordinates.map(parseFloat)
        },
        "properties": {
            "name": location.name,
            "address": location.address,
            "category": location.category
        }
    };
};

export default dataToGeoJson;