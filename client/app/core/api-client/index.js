const urls = {
    locations: "/static-api/public/data",
    makePostcodeUrl: function (postcode) {
        return `https://api.postcodes.io/postcodes/${postcode.replace(" ", "")}`;
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

const makeApiClient = function (fetchObject) {
    return {
        locations: function () {
            return fetchObject(urls.locations)
                .then(function (result) {
                    return result.json();
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
        }
    };
};

export default makeApiClient;