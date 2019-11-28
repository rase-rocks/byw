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
const tags = require("../client/app/core/model/geirfa/tags").default;

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
                    console.log(unit);
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

    describe("select", function() {

        it("returns num of random results", function () {

            const geirfa = makeGeirfa(geirfaJson);
            const num = 50;
            const matches = geirfa.select(num);

            expect(matches.length).to.be.equal(num);

        });

        it("returns object of correct shape", function () {

            const geirfa = makeGeirfa(geirfaJson);
            const num = 20;
            const matches = geirfa.select(num);

            expect(matches.length).to.be.equal(num);

            matches.forEach(function(match) {

                requiredKeys.forEach(key => {
                    expect(match.hasOwnProperty(key)).to.be.true;
                });

            });

        });

        it("returns unique objects", function () {

            const geirfa = makeGeirfa(geirfaJson);
            const num = 100;
            const matches = geirfa.select(num);

            const set = {};

            matches.forEach(function(unit) {

                if (!set[unit.id]) {
                    set[unit.id] = 0;
                }

                set[unit.id]++;

            });

            const counts = Object.values(set);

            counts.forEach(function (count) {
                expect(count).to.be.equal(1);
            });

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

    describe("tags", function() {

        it("returns as expected from geirfa", function() {

            const geirfa = makeGeirfa(geirfaData);
            const result = geirfa.tags;
            const result2 = geirfa.tags; // Check init only runs once

            expect(result.length).to.be.equal(3);

            expect(result.indexOf("hair")).to.not.equal(-1);
            expect(result.indexOf("body")).to.not.equal(-1);
            expect(result.indexOf("head")).to.not.equal(-1);

            expect(result2.length).to.be.equal(3);

            expect(result2.indexOf("hair")).to.not.equal(-1);
            expect(result2.indexOf("body")).to.not.equal(-1);
            expect(result2.indexOf("head")).to.not.equal(-1);

        });

        it("returns expected tags from units", function() {

            const result = tags(geirfaData);

            expect(result.length).to.be.equal(3);

            expect(result.indexOf("hair")).to.not.equal(-1);
            expect(result.indexOf("body")).to.not.equal(-1);
            expect(result.indexOf("head")).to.not.equal(-1);

        });

        it("removes empty tags", function () {

            const data = [
                {
                    "en": "dandruff",
                    "cy": "cen",
                    "tags": [
                        "head",
                        "body",
                        "hair",
                        " "
                    ],
                    "notes": "(pl)"
                },
                {
                    "en": "ear",
                    "cy": "clust",
                    "tags": [
                        "head",
                        "body",
                        ""
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

            const result = tags(data);

            expect(result.length).to.be.equal(3);

            expect(result.indexOf("hair")).to.not.equal(-1);
            expect(result.indexOf("body")).to.not.equal(-1);
            expect(result.indexOf("head")).to.not.equal(-1);

        });

    });

});