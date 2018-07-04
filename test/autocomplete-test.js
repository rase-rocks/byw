/* global describe it */

const expect = require("chai").expect;
const makeIndex = require("../client/app/core/model/autocomplete").makeIndex;
const getWord = require("../client/app/core/model/autocomplete").getWord;

const sampleData = require("./autocomplete-data").default;

describe("autocomplete", function () {

    describe("makeIndex", function () {

        it("handles empty sample data and returns an empty index", function (done) {

            makeIndex()
                .then(function (index) {
                    let pass = true;

                    if (!index) pass = false;
                    if (!index.words) pass = false;
                    if (!index.tokens || typeof index.tokens !== "object") pass = false;

                    const error = (pass) ? undefined : new Error("Failed to return a valid index");
                    done(error);
                });
        });

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

        it("handles an empty search", function (done) {

            makeIndex(sampleData)
                .then(function (index) {
                    getWord(undefined, index)
                        .then(function (word) {
                            done((word === "") ? undefined : new Error("Did not handle empty input"));
                        });
                });

        });

        it("handles an empty index", function (done) {

            getWord("aber", undefined)
                .then(function (word) {
                    done((word === "") ? undefined : new Error("Did not handle empty index"));
                });

        });

        it("handles a malformed index", function (done) {

            const index = {words: [], tokens: undefined};
            
            getWord("aber", index)
                .then(function (word) {
                    done((word === "") ? undefined : new Error("Did not handle empty index"));
                });

        });

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