/* global describe it */

const expect = require("chai").expect;

const allText = require("../client/app/core/text/data").default;
const supportedKeys = require("../client/app/core/text/supported-keys").default;
const supportedLanguages = require("../client/app/core/text/supported-languages").default;

const hasErrors = require("../client/app/core/model/form").hasErrors;
const item = require("../client/app/core/model/form").item;
const keys = require("../client/app/core/model/form").keys;

const validate = require("../client/app/core/redux/middleware/submit-middleware").validate;

const englishText = allText[supportedLanguages.english];

const sampleLatitude = 52.4159479;
const sampleLongitude = -4.062818;
const sampleGeohash = "gcm45w1912zk";
const sampleCoords = [sampleLongitude, sampleLatitude];

const validForm = function () {
    return {
        coordinateHash: item(keys.coordinateHash, sampleGeohash),
        timestamp: item(keys.timestamp, new Date().toISOString()),
        name: item(keys.name, "The premises name"),
        address: item(keys.address, "The Place, The Street"),
        postcode: item(keys.postcode, "WA10 7BJ"),
        coordinates: item(keys.coordinates, [sampleLongitude, sampleLatitude]),
        category: item(keys.category, 0.75)
    };
};

function makeMockStore(stateForm, language = supportedLanguages.english) {
    return {
        getState: function () {
            return {
                form: stateForm,
                settings: {
                    language: language
                }
            };
        }
    };
}

describe("submit-middlware", function () {

    describe("validate", function () {

        it("handles valid form", function (done) {

            const f = validForm();
            const store = makeMockStore(f);

            validate(store)
                .then(function (validatedForm) {
                    expect(hasErrors(validatedForm)).to.be.equal(false);
                    done();
                })
                .catch(done);

        });

        it("returns form with expected errors", function (done) {

            const invalidPostcode = validForm();
            invalidPostcode.postcode = item(keys.postcode, "invalid_postcode");
            invalidPostcode.coordinates = item(keys.coordinates, sampleCoords);
            invalidPostcode.coordinateHash = item(keys.coordinateHash, sampleGeohash);

            const store = makeMockStore(invalidPostcode);

            validate(store)
                .then(function (vForm) {

                    expect(vForm[keys.postcode].error, JSON.stringify(vForm, null, 4))
                        .to
                        .be
                        .equal(englishText[supportedKeys.errorInvalidPostcode]);

                    done();
                })
                .catch(done);

        });

    });

});