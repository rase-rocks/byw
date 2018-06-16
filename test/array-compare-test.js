/* global describe it */

const expect = require("chai").expect;

const arrayCompare = require("../client/app/core/model/array-compare").default;

describe("array-compare", function () {

    it("identifies equal arrays", function () {

        const samples = [
            [1, 2, 3],
            ["a", "b", "c"],
            ["b", "c", ["a", "b"]],
            [1, []],
            [[], []]
        ];

        const tests = samples.reduce(function (acc, sample) {
            return [...acc, { a: [...sample], b: [...sample] }];
        }, []);

        tests.forEach(test => {
            expect(arrayCompare(test.a, test.b)).to.equal(true);
        });

    });

    it("identifies inequal arrays", function () {

        const tests = [

            {
                a: [1, 2, 3],
                b: [1, 2, 3, 4]
            },
            {
                a: [1, 2, 3],
                b: [1, 2, 4]
            },
            {
                a: ["1", 2, 3],
                b: [1, 2, 3]
            },
            {
                a: [1, 2, 3, [1, 2]],
                b: [1, 2, 3, [1, 3]]
            },
            {
                a: [1, [1, 2, [3, 4]]],
                b: [1, [2, 2, [3, 4]]]
            },
            {
                a: [],
                b: [1]
            }

        ];

        tests.forEach(test => {
            expect(arrayCompare(test.a, test.b)).to.equal(false);
        });

    });

});