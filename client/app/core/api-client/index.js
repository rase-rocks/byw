const urls = {
    locations: "/static-api/public/data"
};

const makePostcodeUrl = function (postcode) {
    return `https://api.postcodes.io/postcodes/${postcode.replace(" ", "")}`;
};

const makeCoordinate = function (result) {
    const { latitude, longitude } = result;
    return [longitude, latitude];
};

const cache = {};

const makeApiClient = function (fetchObject) {
    return {
        locations: function () {
            return fetchObject(urls.locations)
                .then(function (result) {
                    return result.json();
                });
        },
        geocodePostcode: function (postcode) {

            const cachedResult = cache[postcode];

            if (cachedResult) {
                return Promise.resolve(cachedResult);
            }

            return fetchObject(makePostcodeUrl(postcode))
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    return makeCoordinate(json.result);
                })
                .then(function (coordinate) {
                    cache[postcode] = coordinate;
                    return coordinate;
                })
                .catch(function (err) {
                    return Promise.reject(`Error in obtaining postcode: ${err}`);
                });
        }
    };
};

export default makeApiClient;