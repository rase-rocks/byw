/* global describe it */

const expect = require("chai").expect;
const supportedKeys = require("../text/build-scripts/supported-keys").default;
const translations = require("../text/build-scripts/translations").default;

const makeTest = function (testFn, done) {
    supportedKeys()
        .then(function (keys) {

            translations()
                .then(function (allTranslations) {

                    Object
                        .keys(allTranslations)
                        .map(key => {
                            return {
                                language: key,
                                translation: allTranslations[key]
                            };
                        })
                        .forEach(test => {

                            testFn(keys, test);

                        });

                    done();

                })
                .catch(done);


        })
        .catch(done);
};

describe("Text", function () {

    describe("translation data", function () {

        it("has all required keys for all translations", function (done) {

            makeTest(function (keys, test) {

                keys.forEach(key => expect(test.translation[key], `${key} missing from ${test.language}`).to.exist);

            }, done);

        });

        it("has no keys not found in English version", function (done) {

            // We will be using the English version as the source for the supported keys for code completion

            makeTest(function (keys, test) {

                Object
                    .keys(test.translation)
                    .forEach(key => expect(keys.indexOf(key), `Extra key ${key} in ${test.language}`).to.not.equal(-1));

            }, done);

        });

        it("has no empty values", function (done) {

            makeTest(function (keys, test) {

                keys.forEach(key => expect(test.translation[key], `${key} is empty in ${test.language}`).to.not.equal(""));

            }, done);

        });

    });

});