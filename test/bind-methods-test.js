/* global describe it */

const expect = require("chai").expect;

const bindMethods = require("../client/app/core/bind-methods").default;

class E {

    constructor() {
        this.testValue = "The test value";
    }

    testFunction() {
        return this.testValue;
    }
}

describe("bind-methods", function () {

    it("correctly binds the this object", function () {

        const e = new E();
        bindMethods(e, ["testFunction"]);

        expect(e.testFunction()).to.equal("The test value");

    });

});
