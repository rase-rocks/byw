/* global describe it */

const expect = require("chai").expect;

const text = require("../client/app/core/text/data").default;
const supportedLanguages = require("../client/app/core/text/supported-languages").default;
const supportedKeys = require("../client/app/core/text/supported-keys").default;

const form = require("../client/app/core/model/form").default;
const exp = require("../client/app/core/model/form");

const {
    formUpdatingDataKey,
    formUpdatingErrorKey,
    formFromLocation,
    formTimestamped,
    postDataFromForm,
    hasErrors,
    validatedForm,
    keys,
    postKeys,
    item,
    valueForKey,
    timestampString,
    coordinateHashFromForm
} = exp;

const englishText = text[supportedLanguages.english];

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

const makeForm = function (key, value) {
    return Object.assign(
        {},
        validForm(),
        { [key]: item(key, value) });
};

describe("form", function () {

    describe("init", function () {

        it("has all keys are initialised", function () {
            expect(Object.keys(form).length).to.be.equal(Object.keys(keys).length);
        });

    });

    describe("formUpdatingDataKey", function () {

        it("returns a new object and updates the key - valid input", function () {

            const alteredKey = keys.name;

            const oldForm = Object.assign({}, form);
            oldForm.address = item(keys.address, "The address");
            oldForm.postcode = item(keys.postcode, "XX01 1XX");
            oldForm.category = item(keys.category, 0.75);
            oldForm.coordinates = item(keys.coordinates, sampleCoords);
            oldForm.coordinateHash = item(keys.coordinateHash, sampleGeohash);

            const newForm = formUpdatingDataKey(oldForm, alteredKey, "Robert");

            expect(newForm !== oldForm);
            expect(valueForKey(newForm, keys.name)).to.be.equal("Robert");

            const noneUpdatedKeys = Object.keys(keys).filter(key => key !== alteredKey);

            noneUpdatedKeys.forEach(key => {
                expect(valueForKey(newForm, key)).to.be.equal(valueForKey(oldForm, key));
            });

        });



    });

    describe("formUpdatingErrorKey", function () {

        it("returns the new form with error attached", function () {

            const alteredKey = keys.name;

            const oldForm = {};
            oldForm.coordinateHash = item(keys.coordinateHash, sampleGeohash);
            oldForm.timestamp = item(keys.timestamp, new Date().toISOString());
            oldForm.name = item(keys.name, "Robert");
            oldForm.address = item(keys.address, "The address");
            oldForm.postcode = item(keys.postcode, "XX01 1XX");
            oldForm.category = item(keys.category, 0.75);
            oldForm.coordinates = item(keys.coordinates, sampleCoords);

            const errorString = "The name has an error";

            const newForm = formUpdatingErrorKey(oldForm, alteredKey, errorString);

            const noneUpdatedKeys = Object.keys(keys).filter(key => key !== alteredKey);

            noneUpdatedKeys.forEach(key => {
                expect(valueForKey(newForm, key)).to.be.equal(valueForKey(oldForm, key));
            });

            expect(newForm[alteredKey].error).to.be.equal(errorString);

        });

    });

    describe("formUpdatingFromLocation", function () {

        it("returns a new form with the correct values", function () {

            const location = {
                coordinateHash: sampleGeohash,
                timestamp: new Date().toISOString(),
                name: "The new name",
                address: "The new street address",
                postcode: "LL30 7HJ",
                coordinates: sampleCoords,
                category: 0.5
            };

            const newForm = formFromLocation(location);

            Object.keys(newForm).forEach(function (key) {

                expect(valueForKey(newForm, key)).to.be.equal(location[key]);

            });


        });

    });

    describe("formTimestamped", function () {

        it("returns a form with the timestamp applied", function () {

            const valid = validForm();
            const timestamp = "2018-07-27T16:37:52.154Z";
            const stamped = formTimestamped(valid, timestamp);

            Object.keys(valid)
                .filter(key => key !== keys.timestamp)
                .forEach(function (key) {
                    expect(valueForKey(valid, key)).to.be.equal(valueForKey(stamped, key));
                });
            expect(valueForKey(stamped, keys.timestamp)).to.be.equal(timestamp);

        });
    });

    describe("coordinateFromForm", function () {

        it("returns correct hash", function () {
            const valid = validForm();

            expect(coordinateHashFromForm(valid)).to.be.equal(sampleGeohash);
        });

    });

    describe("postDataFromForm", function () {

        it("returns all fields correctly", function () {
            const valid = validForm();
            const timestamp = timestampString();
            const postData = postDataFromForm(valid, timestamp);

            const allPostKeys = Object.keys(postKeys);

            expect(Object.keys(postData).length).to.be.equal(allPostKeys.length);
            expect(postData.timestamp).to.be.equal(timestamp);

            allPostKeys.filter(key => key !== keys.timestamp)
                .forEach((key) => {
                    expect(postData[key]).to.be.equal(valueForKey(valid, key));
                });

        });

    });

    describe("hasErrors", function () {

        it("finds errors for each key", function () {

            [
                {
                    testKey: keys.name,
                    form: makeForm(keys.name, ""),
                    error: englishText[supportedKeys.errorMissingName]
                },
                {
                    testKey: keys.address,
                    form: makeForm(keys.address, ""),
                    error: englishText[supportedKeys.errorMissingAddress]
                },
                {
                    testKey: keys.coordinates,
                    form: makeForm(keys.coordinates, []),
                    error: englishText[supportedKeys.errorInvalidCoordinates]
                },
                {
                    testKey: keys.coordinateHash,
                    form: makeForm(keys.coordinateHash, ""),
                    error: englishText[supportedKeys.errorInvalidCoordinates]
                },
                {
                    testKey: keys.coordinateHash,
                    form: makeForm(keys.coordinateHash, "gcm3"),
                    error: englishText[supportedKeys.errorInvalidCoordinates]
                }
            ].map(test => Object.assign({}, test, { form: validatedForm(test.form, englishText) }))
                .forEach(test => expect(hasErrors(test.form)).to.be.equal(true));

        });

        it("does not false positive", function () {
            const frm = validForm();
            expect(hasErrors(frm)).to.be.equal(false);
        });

    });

    describe("validatedForm", function () {

        it("returns a new object", function () {
            const valid = validForm();
            const validated = validatedForm(valid);

            expect(validated).to.not.equal(valid);
        });

        it("gives no errors for valid input", function () {

            const valid = validForm();
            const vForm = validatedForm(valid);

            Object.keys(keys).forEach(key => {
                expect(vForm[key].error).to.be.equal("");
            });

            Object.keys(keys).forEach(key => {
                expect(valueForKey(vForm, key)).to.be.equal(valueForKey(valid, key));
            });
        });

        it("handles invalid postcode - with coordinates", function () {

            const invalidPostcode = validForm();
            invalidPostcode.postcode = item(keys.postcode, "invalid_postcode");
            invalidPostcode.coordinates = item(keys.coordinates, sampleCoords);
            invalidPostcode.coordinateHash = item(keys.coordinateHash, sampleGeohash);

            const vForm = validatedForm(invalidPostcode, englishText);

            expect(vForm[keys.postcode].error).to.be.equal(englishText[supportedKeys.errorInvalidPostcode]);

        });

        it("handles invalid coordinates - with postcode", function () {

            const invalidCoordinates = validForm();
            invalidCoordinates.postcode = item(keys.postcode, "WA10 7BJ");
            invalidCoordinates.coordinates = item(keys.coordinates, []);

            const vForm = validatedForm(invalidCoordinates, englishText);

            expect(vForm[keys.coordinates].error).to.be.equal(englishText[supportedKeys.errorInvalidCoordinates]);

        });

        it("handles empty postcode", function () {

            const emptyPostcode = validForm();
            emptyPostcode.postcode = item(keys.postcode, undefined);

            const vForm = validatedForm(emptyPostcode, englishText);

            expect(vForm[keys.postcode].error).to.be.equal("");

        });

        it("handles empty string postcode", function () {

            const emptyPostcode = validForm();
            emptyPostcode.postcode = item(keys.postcode, "");

            const vForm = validatedForm(emptyPostcode, englishText);

            expect(vForm[keys.postcode].error).to.be.equal("");

        });

        it("handles missing name", function () {
            const missingName = validForm();
            missingName.name = item(keys.name, "");

            const vForm1 = validatedForm(missingName, englishText);

            const undefName = validForm();
            undefName.name = item(keys.name, undefined);

            const vForm2 = validatedForm(undefName, englishText);

            [vForm1, vForm2].forEach(frm => {
                expect(frm.name.error).to.be.equal(englishText[supportedKeys.errorMissingName]);
            });
        });

        it("handles missing address", function () {
            const missingAddress = validForm();
            missingAddress.address = item(keys.address, "");

            const vForm1 = validatedForm(missingAddress, englishText);

            const undefAddress = validForm();
            undefAddress.address = item(keys.address, undefined);

            const vForm2 = validatedForm(undefAddress, englishText);

            [vForm1, vForm2].forEach(frm => {
                expect(frm.address.error).to.be.equal(englishText[supportedKeys.errorMissingAddress]);
            });
        });

        it("handles missing category", function () {
            const missingCategory = validForm();
            missingCategory.category = item(keys.category, "");

            const vForm1 = validatedForm(missingCategory, englishText);

            const undefCategory = validForm();
            undefCategory.category = item(keys.category, undefined);

            const vForm2 = validatedForm(undefCategory, englishText);

            [vForm1, vForm2].forEach(frm => {
                expect(frm.category.error).to.be.equal(englishText[supportedKeys.errorMissingCategory]);
            });
        });

        it("handles coordinate mismatch", function () {

            const mismatch = validForm();
            mismatch.coordinateHash = "gcbms2";

            const validated = validatedForm(mismatch, englishText);

            expect(validated.coordinates.error).to.be.equal(englishText[supportedKeys.errorCoordinatesMismatch]);

        });

    });



});