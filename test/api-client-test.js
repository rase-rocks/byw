/* global describe it*/

const expect = require("chai").expect;

const makeApiClient = require("../client/app/core/api-client").default;

const geohash = "gcm45w1912zk";

const sample = {
    "coordinateHash": geohash,
    "name": "Aberystwyth Arts Centre",
    "address": "Aberystwyth University - Penglais Campus, Aberystwyth SY23 3DE, UK",
    "postcode": "SY23 3DE",
    "category": 0.75
};

const locations = [
    Object.assign({}, sample, { name: "The first place"} ),
    Object.assign({}, sample, { name: "The second place"} )
];

const POSTCODE = "LL20 8SW";
const postcodeResponse = {
    "status": 200,
    "result": [
        {
            "postcode": POSTCODE
        }
    ]
};

const apiLocationsResponse = {
    json: function () {
        return locations;
    }
};

const apiPostcodeResponse = {
    json: function () {
        return postcodeResponse;
    }
};

const apiSubmitResponse = {
    json: function () {
        return {};
    }
};

const apiSubmitErrorResponse = {
    json: function () {
        return {
            type: "aws error message",
            message: "descriptive error from aws"
        };
    }
};

const makeMockFetch = function (apiResponse) {
    return function () {
        return new Promise(function (resolve) {
            resolve(apiResponse);
        });
    };
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
            const api = makeApiClient(makeMockFetch(apiLocationsResponse));
            expect(api).to.exist;
        });

    });

    describe("submit", function () {

        it("handles success", function (done) {

            const api = makeApiClient(makeMockFetch(apiSubmitResponse));

            api.submit({})
                .then(function () {
                    done();
                })
                .catch(function () {
                    done(new Error("Returned an unexpected error"));
                });

        });

        it("handles error", function (done) {

            const api = makeApiClient(makeMockFetch(apiSubmitErrorResponse));

            api.submit({})
                .then(function () {
                    done(new Error("Did not error"));
                })
                .catch(function () {
                    done();
                });

        });

    });

    describe("locations", function () {

        it("returns locations", function (done) {
            const api = makeApiClient(makeMockFetch(apiLocationsResponse));

            api
                .locations()
                .then(function (result) {
                    
                    if (!result) { done(new Error("Did not return locations")); return; }

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

    describe("reverseGeocode", function () {

        it("returns postcode", function (done) {
            //lon -3.172 lat 52.973

            const api = makeApiClient(makeMockFetch(apiPostcodeResponse));

            api.reverseGeocode([-3.172, 52.973])
                .then(function (response) {
                    const err = (response !== POSTCODE) ? new Error("Did not return a postcode") : undefined;
                    done(err);
                })
                .catch(function (err) {
                    done(err);
                });

        });

    });


});