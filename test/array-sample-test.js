/* global describe it */

const expect = require("chai").expect;

const sample = require("../client/app/core/model/array-sample").default;

describe("array-sample", function () {

    it("returns one of the supplied elements", function () {

        const tests = [1,2,3,5];

        const element = sample(tests);
        
        expect(tests.indexOf(element)).to.not.equal(-1);

    });

});