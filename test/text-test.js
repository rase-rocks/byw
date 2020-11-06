/* global describe it */

const expect = require("chai").expect;
const fs = require("fs");
const path = require("path");

const getFiles = require("./get-files").default;

const supportedKeys = require("../text/build-scripts/supported-keys").default;
const translations = require("../text/build-scripts/translations").default;

const requiredTextKeysTitle = require("../client/app/nav/routes").requiredTextKeysTitle;
const requiredTextKeysTitleTag = require("../client/app/nav/routes").requiredTextKeysTitleTag;

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

        it("has suitable folder names", function (done) {

            const languagesFolder = path.join(__dirname, "../", "text", "languages");
            
            fs.readdir(languagesFolder, "utf-8", function (err, folders) {
                if (err) { done(err); }

                folders.forEach(languageName => {
                    expect(languageName.toLowerCase()).to.be.equal(languageName);

                    languageName
                        .split("")
                        .forEach(char => expect(char).to.be.not.equal(" "));

                });

                done();

            });

        });

        it("has all nav routes", function (done) {

            makeTest(function (keys) {

                const test = titleKey => 
                    expect(keys.indexOf(titleKey), `${titleKey} missing`).to.be.not.equal(-1);

                requiredTextKeysTitle.forEach(test);
                requiredTextKeysTitleTag.forEach(test);

            }, done);

        });

    });

    describe("Auto Checking for Text Rendering Components", function () {

        it("has no undefined text properties", function (done) {

            const clientPath = path.join("./client/app/pages/");
            const files = getFiles(clientPath);

            makeTest(function (keys, test) {

                const text = test.translation;
                
                files.forEach(scriptPath => {
    
                    const getText = require(`../${scriptPath}`).getText;
    
                    if (getText) {
                        
                        const content = getText(text);

                        Object
                            .keys(content)
                            .forEach(key => {
                                const translationItem = content[key];
                                const errMsg = `${scriptPath} getText property '${key}' is empty in '${test.language}'`;
                                expect(translationItem, errMsg).to.not.equal(undefined);
                                expect(translationItem.length).to.be.greaterThan(1);
                            });

                    }
    
                });

            }, done);


        });

    });

});