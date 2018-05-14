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
        }
    };
};

export default makeApiClient;