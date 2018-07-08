const urls = {
    locations: "static-api/public/data",
    makePostcodeUrl: function (postcode) {
        return `https://api.postcodes.io/postcodes/${postcode.replace(" ", "")}`;
    },
    makeReverseGeocodeUrl: function (geojsonCoordinate) {
        const lon = geojsonCoordinate[0];
        const lat = geojsonCoordinate[1];
        return `https://api.postcodes.io/postcodes?lon=${lon}&lat=${lat}`;
    }
};

const makeCoordinate = function (json) {
    const { latitude, longitude } = json.result;
    return [longitude, latitude];
};

const cache = {};

const cacheResult = function (postcode) {
    return function (coordinate) {
        cache[postcode] = coordinate;
        return coordinate;
    };
};

const getJson = function (response) {
    return response.json();
};

const getPostcode = function (json) {
    return (json.status === 200) 
        ? (json.result) 
            ? (json.result[0])
                ? json.result[0].postcode
                : undefined
            : undefined
        : undefined;
};

const makeApiClient = function (fetchObject) {
    return {
        locations: function () {
            return fetchObject(urls.locations)
                .then(getJson)
                .catch(function (error) {
                    console.warn(error);
                });
        },
        geocodePostcode: function (postcode) {

            const cachedCoordinate = cache[postcode];

            if (cachedCoordinate) {
                return Promise.resolve(cachedCoordinate);
            }

            return fetchObject(urls.makePostcodeUrl(postcode))
                .then(getJson)
                .then(makeCoordinate)
                .then(cacheResult(postcode))
                .catch(function (err) {
                    return Promise.reject(`Error in obtaining postcode: ${err}`);
                });
        },
        reverseGeocode: function (geoJsonCoordinate) {
            return fetchObject(urls.makeReverseGeocodeUrl(geoJsonCoordinate))
                .then(getJson)
                .then(getPostcode);
        }
    };
};

export default makeApiClient;