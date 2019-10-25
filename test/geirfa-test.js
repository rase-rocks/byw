/* global describe it */

const expect = require("chai").expect;

const geirfaJson = require("../client/app/pages/vocabulary/geirfa.json");
const arrayCompare = require("../client/app/core/model/array-compare").default;

const makeGeirfa = require("../client/app/core/model/geirfa").default;
const unitsEqual = require("../client/app/core/model/geirfa").unitsEqual;
const unitContainsText = require("../client/app/core/model/geirfa").unitContainsText;
const trim = require("../client/app/core/model/geirfa").trim;
const tweetableUnit = require("../client/app/core/model/geirfa/tweetable-unit").default;
const sample = require("../client/app/core/model/array-sample").default;
const tokens = require("../client/app/core/model/geirfa/tokens").default;

const hash = function (obj) {
    let string = JSON.stringify(obj);

    var hash = 5381,
        i = string.length;

    while (i) {
        hash = (hash * 33) ^ string.charCodeAt(--i);
    }

    return `${hash >>> 0}`;
};

const geirfaData = [
    {
        "en": "dandruff",
        "cy": "cen",
        "tags": [
            "head",
            "body",
            "hair"
        ],
        "notes": "(pl)"
    },
    {
        "en": "ear",
        "cy": "clust",
        "tags": [
            "head",
            "body"
        ],
        "notes": "(f/m) -iau"
    },
    {
        "en": "crown of head",
        "cy": "corun",
        "tags": [
            "head",
            "body"
        ],
        "notes": "(m) -au"
    }
].map(unit => Object.assign({}, unit, { id: hash(unit) }));

const requiredKeys = [
    "en", "cy", "tags", "notes", "id"
];

describe("geirfa", function () {

    describe("geirfa.json", function () {

        it("has all objects with required keys", function () {

            geirfaJson.forEach(unit => {

                requiredKeys.forEach(key => {
                    expect(unit.hasOwnProperty(key)).to.be.true;
                });

            });

        });

        it("has no duplicate id's", function () {

            const tally = {};

            geirfaJson.forEach(unit => {

                if (tally[unit.id] === undefined) {
                    tally[unit.id] = true;
                } else {
                    expect(true).to.be.false;
                }

            });

        });

    });

    describe("test data", function () {

        it("has all objects with required keys", function () {

            geirfaData.forEach(unit => {

                requiredKeys.forEach(key => {
                    expect(unit.hasOwnProperty(key)).to.be.true;
                });

            });

        });

    });

    describe("all", function () {

        it("returns the data intact", function () {

            let emptyableData = geirfaData;

            const geirfa = makeGeirfa(emptyableData);
            emptyableData = undefined;

            const all = geirfa.all();

            expect(all.length).to.be.equal(geirfaData.length);

            for (let i = 0; i < geirfaData.length; i++) {

                const allValue = JSON.stringify(all[i]);
                const originalValue = JSON.stringify(geirfaData[i]);

                expect(allValue).to.be.equal(originalValue);

            }

        });

    });

    describe("find-matches", function () {

        it("matches against known value", function () {

            const geirfa = makeGeirfa(geirfaData);

            const matches = geirfa.findMatches("clust");

            expect(matches.length).to.be.equal(1);

        });

        it("matches removing whitespace", function () {

            const geirfa = makeGeirfa(geirfaData);

            const matches = geirfa.findMatches(" clust");

            expect(matches.length).to.be.equal(1);

        });

        it("returns empty array when no matches", function () {

            const geirfa = makeGeirfa(geirfaData);

            const matches = geirfa.findMatches(" space");

            expect(matches.length).to.be.equal(0);

        });


    });

    describe("units-equal-geirfa", function () {

        it("returns true for known match", function () {

            const geirfa = makeGeirfa(geirfaData);

            const ear = {
                "en": "ear",
                "cy": "clust",
                "tags": [
                    "head",
                    "body"
                ],
                "notes": "(f/m) -iau"
            };

            const otherEar = geirfaData[1];

            expect(geirfa.unitsEqual(ear, otherEar)).to.be.true;

        });

        it("returns false for none match", function () {

            const geirfa = makeGeirfa(geirfaData);

            const ear = {
                "en": "ear",
                "cy": "clust",
                "tags": [
                    "head",
                    "body"
                ],
                "notes": "(f/m) -iau"
            };

            const notEar = geirfaData[0];

            expect(geirfa.unitsEqual(ear, notEar)).to.be.false;

        });

        it("handles malformed data", function () {

            const geirfa = makeGeirfa(geirfaData);

            const ear = {
                "en": "ear",
                "cy": "clust",
                "tags": [
                    "head",
                    "body"
                ],
                "notes": "(f/m) -iau"
            };

            const notEar = {};

            expect(geirfa.unitsEqual(ear, notEar)).to.be.false;

        });

    });

    describe("units-equal", function () {

        it("returns true for known match", function () {

            const ear = {
                "en": "ear",
                "cy": "clust",
                "tags": [
                    "head",
                    "body"
                ],
                "notes": "(f/m) -iau"
            };

            const otherEar = geirfaData[1];

            expect(unitsEqual(ear, otherEar)).to.be.true;

        });

        it("returns false for none match", function () {

            const ear = {
                "en": "ear",
                "cy": "clust",
                "tags": [
                    "head",
                    "body"
                ],
                "notes": "(f/m) -iau"
            };

            const notEar = geirfaData[0];

            expect(unitsEqual(ear, notEar)).to.be.false;

        });

        it("handles malformed data", function () {

            const ear = {
                "en": "ear",
                "cy": "clust",
                "tags": [
                    "head",
                    "body"
                ],
                "notes": "(f/m) -iau"
            };

            const notEar = {};

            expect(unitsEqual(ear, notEar)).to.be.false;

        });

    });

    describe("remove-whitespace", function () {

        it("does not mangle text", function () {

            const sample = "This is the sample";
            const trimmed = trim(sample);

            expect(trimmed).to.be.equal(sample);

        });

        it("removes all whitespace", function () {

            const sample = " This is the sample ";
            const trimmed = trim(sample);

            expect(trimmed).to.be.equal("This is the sample");

        });

    });

    describe("unit-contains-text", function () {

        it("returns true as expected", function () {

            const dandruff = geirfaData[0];

            expect(unitContainsText(dandruff, "dand")).to.be.true;
            expect(unitContainsText(dandruff, "cen")).to.be.true;

        });

        it("returns true for phrases", function () {
            
            const crownOfHead = geirfaData[2];

            expect(unitContainsText(crownOfHead, "crown head")).to.be.true;

        });

        it("returns true for tag match", function () {

            const dandruff = geirfaData[0];

            expect(unitContainsText(dandruff, "hea")).to.be.true;
            expect(unitContainsText(dandruff, "hai")).to.be.true;
            expect(unitContainsText(dandruff, "hair")).to.be.true;
            expect(unitContainsText(dandruff, "bo")).to.be.true;

        });

        it("returns false for none match", function () {

            const dandruff = geirfaData[0];

            expect(unitContainsText(dandruff, "clust")).to.be.false;

        });

    });

    describe("random-tweet", function () {

        it("returns a string suitable to be tweeted", function () {

            let geirfa = makeGeirfa(geirfaJson);

            for (let i = 0; i < 100; i++) {

                const tweet = geirfa.randomTweet();

                expect(tweet).to.exist;
                expect(typeof (tweet)).to.be.equal("string");
                expect(tweet.length <= 280).to.be.true;
                expect(tweet.length > 5).to.be.true;

            }

        });

    });

    describe("tweetable-unit", function () {

        it("returns a string suitable to be tweeted", function () {

            for (let i = 0; i < 100; i++) {

                const unit = sample(geirfaJson);

                const tweet = tweetableUnit(unit);

                expect(tweet).to.exist;
                expect(typeof (tweet)).to.be.equal("string");
                expect(tweet.length <= 280).to.be.true;
                expect(tweet.length > 5).to.be.true;

            }

        });

    });

    describe("tokens", function () {

        it("does not modify phrase without spaces", function () {

            const testPhrase = "ThisIsThePhrase";
            const t = tokens(testPhrase);

            expect(arrayCompare(t, [testPhrase])).to.be.true;

        });

        it("splits phrase in spaces", function () {

            const words = ["This", "is", "the", "phrase"];
            const testPhrase = words.join(" ");
            const t = tokens(testPhrase);

            expect(arrayCompare(t, words)).to.be.true;

        });

        it("handles empty string", function () {

            const t = tokens("");

            expect(arrayCompare(t, [""])).to.be.true;

        });

        it("handles undefined", function () {

            const t = tokens(undefined);

            expect(arrayCompare(t, [""])).to.be.true;

        });

    });

});