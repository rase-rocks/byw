/* global describe it */

const expect = require("chai").expect;
const makeIndex = require("../client/app/core/model/autocomplete").makeIndex;
const getWord = require("../client/app/core/model/autocomplete").getWord;

const sampleData = require("./autocomplete-data").default;

describe("autocomplete", function () {

    describe("makeIndex", function () {

        it("returns an index of tokens for the locations passed in", function (done) {
            makeIndex(sampleData)
                .then(function (index) {
            
                    let pass = true;

                    index.words.forEach(element => {
                        expect(typeof element).to.equal("string");
                        if (typeof element !== "string") pass = false;
                        const splits = element.split(" ");
                        if (splits.length !== 1) pass = false;
                    });

                    const error = (pass) ? undefined : new Error("Tokenization failed");
                    done(error);

                });
        });

    });

    describe("getWord", function () {

        it("returns the complete word for the search", function (done) {
            const candidate = "aber";
            const expected = "aberystwyth";

            makeIndex(sampleData)
                .then(function (index) {
                    getWord(candidate, index)
                        .then(function (word) {
                            done((word === expected) ? undefined : new Error(`Failed to pick word: got ${word}`));
                        });
                });

        });

    });


});