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
    json: function() {
        return locations;
    }
};

const mockFetch = function () {
    return new Promise(function(resolve) {
        resolve(apiResponse);
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


});