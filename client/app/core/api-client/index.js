import { addCoordinates } from "../model/geo-hash";

const urls = {
    submit: "https://q64w5l7tw9.execute-api.eu-west-1.amazonaws.com/v1/submit",
    locations: "https://q64w5l7tw9.execute-api.eu-west-1.amazonaws.com/v1/locations",
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

const makePostData = function (data) {
    return {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    };
};

const makeSubmitResponseHandler = function (resolve, reject) {
    return function (jsonResult) {

        if (!jsonResult) { reject(); return; }
        
        if (Object.keys(jsonResult).length === 0) {
            resolve();
        } else {
            reject();
        }
    };
};

const makeApiClient = function (fetchObject) {
    return {
        submit: function (data) {
            // return new Promise(function (resolve, reject) {
            //     fetchObject(urls.submit, makePostData(data))
            //         .then(getJson)
            //         .then(makeSubmitResponseHandler(resolve, reject));
            // });
            return new Promise(function (resolve, reject) {
                const handler = makeSubmitResponseHandler(resolve, reject);
                handler();
            });
        },
        locations: function () {
            return fetchObject(urls.locations)
                .then(getJson)
                .then(rawLocations => rawLocations.map(addCoordinates))
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