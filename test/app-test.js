/* global describe it*/

const expect = require("chai").expect;

const App = require("../client/app/app").default;

describe("App", function () {

    it("returns an object", function () {
        expect(App).to.exist;
    });

});