const urls = {
    locations: "/static-api/public/data"
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
            return new Promise(function (resolve) {
                console.warn("Warning: Method not implemented  geocodePostcode");
                resolve([53.9, -3.9]);
            });
        }
    };
};

export default makeApiClient;