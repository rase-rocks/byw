/* global describe it*/

const expect = require("chai").expect;

const makeApiClient = require("../client/app/core/api-client").default;

const locations = [
    {
        name: "the first place"
    },
    {
        name: "The second place"
    }
];

const apiResponse = {
    json: function () {
        return locations;
    }
};

const mockFetch = function () {
    return new Promise(function (resolve) {
        resolve(apiResponse);
    });
};

const postcodeMockFetch = function () {
    return new Promise(function (resolve) {
        resolve({
            json: function () {
                return {
                    status: 200,
                    result: {
                        latitude: 53.0685,
                        longitude: -4.07625
                    }
                };
            }
        });
    });
};

const failingPostcodeMockFetch = function () {
    return new Promise(function (resolve) {
        resolve({
            json: function () {
                return {
                    status: 400,
                    result: {}
                };
            }
        });
    });
};


describe("ApiClient", function () {

    describe("Constructor", function () {

        it("returns an object", function () {
            const api = makeApiClient(mockFetch);
            expect(api).to.exist;
        });

    });

    describe("locations", function () {

        it("returns locations", function (done) {
            const api = makeApiClient(mockFetch);

            api
                .locations()
                .then(function (result) {
                    if (result.length > 0) {
                        done();
                    } else {
                        done(new Error("Returned empty locations results"));
                    }

                });

        });

    });

    describe("geocodePostcode", function () {

        it("returns coordinates for a given UK Postcode", function (done) {

            const api = makeApiClient(postcodeMockFetch);

            const postcode = "OX49 5NU";

            api
                .geocodePostcode(postcode)
                .then(function (result) {
                    //expect the result to be a geojson coordinate ([lng, lat])
                    if (result.length == 2 &&
                        typeof result[0] === "number" &&
                        typeof result[1] === "number") {
                        done();
                    } else {
                        done(new Error("Incorrect respone returned"));
                    }
                })
                .catch(function (err) {
                    done(err);
                });
        });

        it("handles an error from postcode.io", function (done) {

            const api = makeApiClient(failingPostcodeMockFetch);

            const postcode = "OX49 5NU";

            api
                .geocodePostcode(postcode)
                .then(function () {
                    done();
                })
                .catch(function () {
                    done();
                });
        });

    });


});