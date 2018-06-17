/* global describe it */

const expect = require("chai").expect;

const arrayCompare = require("../client/app/core/model/array-compare").default;
const arrayMake = require("../client/app/core/model/array-make").default;

const time = function (fn, count) {

    const start = new Date().getTime();

    for (let i = 0; i < count; i++) {
        fn();
    }

    const end = new Date().getTime();
    return end - start;
};

const baselineStringCompare = function (array1, array2) {
    const str1 = JSON.stringify(array1);
    const str2 = JSON.stringify(array2);
    return str1 === str2;
};

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

    it("has valid baseline performance from stringify compare", function () {
        const first = arrayMake(10, () => "array1");
        const second = arrayMake(10, () => "array1");
        const third = arrayMake(10, () => "array3");

        expect(baselineStringCompare(first, second)).to.equal(true);
        expect(baselineStringCompare(first, third)).to.equal(false);

    });

    it("performance test: small equal array", function () {

        const iterations = 1000;

        const first = arrayMake(10, () => "array1");
        const second = arrayMake(10, () => "array1");

        const compareTime = time(function () {
            arrayCompare(first, second);
        }, iterations);

        const stringifyTime = time(function () {
            baselineStringCompare(first, second);
        }, iterations);
        
        expect(compareTime < stringifyTime);

    });

    it("performance test: large equal array", function () {

        const iterations = 10;
        const elements = 10000;
        const first = arrayMake(elements, () => "array1");
        const second = arrayMake(elements, () => "array1");

        const compareTime = time(function () {
            arrayCompare(first, second);
        }, iterations);

        const stringifyTime = time(function () {
            baselineStringCompare(first, second);
        }, iterations);
        expect(compareTime < stringifyTime);

    });

    it("performance test: large inequal array", function () {

        const iterations = 50;
        const elements = 10000;
        const first = arrayMake(elements, () => "array1");
        const second = arrayMake(elements, () => "array2");

        const compareTime = time(function () {
            arrayCompare(first, second);
        }, iterations);

        const stringifyTime = time(function () {
            baselineStringCompare(first, second);
        }, iterations);
        
        expect(compareTime < stringifyTime);

    });

    it("performance test: small inequal array", function () {

        const iterations = 1000;
        const elements = 100;
        const first = arrayMake(elements, () => "array1");
        const second = arrayMake(elements, () => "array2");

        const compareTime = time(function () {
            arrayCompare(first, second);
        }, iterations);

        const stringifyTime = time(function () {
            baselineStringCompare(first, second);
        }, iterations);
        
        expect(compareTime < stringifyTime);

    });

});