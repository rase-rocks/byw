/* global describe it */

const expect = require("chai").expect;

const arrayMake = require("../client/app/core/model/array-make").default;

describe("array-make", function () {

    it("makes an array of the expected length containing expected elements", function () {

        const length = 10;
        const title = "title";
        const array = arrayMake(length, function () {
            return {
                title: title
            };
        });

        expect(array.length).to.equal(length);

        array.forEach(element => {
            expect(element.title).to.equal(title);
        });

    });

});