/* global describe it */

const expect = require("chai").expect;
const safe = require("safe-regex");
const expr = require("../client/app/core/model/regular-expressions");

describe("RegEx Store", function () {

    it("has no complex RegEx", function () {

        Object.keys(expr).map(name => expr[name])
            .forEach(re => {

                expect(safe(re)).to.equal(true);

            });

    });

});
