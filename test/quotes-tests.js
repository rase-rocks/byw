/* global describe it */

const should = require("chai").should();

const { expect } = require("chai");

const randomQuote = require("../client/app/resusable-components/quote/quotes").random;

describe("quotes", function () {

    it("returns a quote", function () {

        let quote = randomQuote();

        should.exist(quote);
        should.exist(quote.CY);
        should.exist(quote.EN);

        expect(quote.CY).to.be.a("string");
        expect(quote.EN).to.be.a("string");

    });

});