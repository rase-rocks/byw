/* global describe it*/

const expect = require("chai").expect;

const arrayCompare = require("../client/app/core/model/array-compare").default;

const pageResults = require("../client/app/core/model/pagination").pageResults;
const pageCount = require("../client/app/core/model/pagination").pageCount;
const pageNumbersFromCount = require("../client/app/core/model/pagination").pageNumbersFromCount;

const makePage = function (count, title) {
    return Array.apply(null, Array(count)).map(idx => {
        return {
            page: title,
            idx: idx
        };
    });
};

const makePageCountTest = function (count, resultsPerPage, expectedPageCount) {
    return {
        count,
        resultsPerPage,
        expectedPageCount
    };
};

describe("pagination-controller", function () {

    describe("pageCount", function () {

        it("returns correct number of pages", function () {

            const tests = [
                makePageCountTest(10, 5, 2),
                makePageCountTest(12, 10, 2),
                makePageCountTest(12, 5, 3),
                makePageCountTest(5, 10, 1),
                makePageCountTest(3, 10, 1)
            ];

            tests.forEach(test => {
                expect(pageCount(test.count, test.resultsPerPage)).to.be.equal(test.expectedPageCount);
            });

        });

        it("returns zero for empty or undefined array", function () {

            const tests = [];
            const undefTests = undefined;

            expect(pageCount(tests.length, 10)).to.be.equal(0);
            expect(pageCount(undefTests, 10)).to.be.equal(0);

        });

    });

    describe("pageResults", function () {

        it("gets correct page results", function () {
            const resultsPerPage = 10;

            const items = [
                ...makePage(resultsPerPage, "1"),
                ...makePage(resultsPerPage, "2"),
                ...makePage(resultsPerPage, "3")
            ];

            const page1 = pageResults(items, 1, resultsPerPage);

            expect(page1.length).to.equal(resultsPerPage);
            page1.forEach(element => {
                expect(element.page).to.equal("1");
            });

            const page2 = pageResults(items, 2, resultsPerPage);

            expect(page2.length).to.equal(resultsPerPage);
            page2.forEach(element => {
                expect(element.page).to.equal("2");
            });

            const page3 = pageResults(items, 3, resultsPerPage);

            expect(page3.length).to.equal(resultsPerPage);
            page3.forEach(element => {
                expect(element.page).to.equal("3");
            });

        });

        it("handles last page", function () {
            const resultsPerPage = 10;

            const trailingresults = 5;

            const items = [
                ...makePage(resultsPerPage, "1"),
                ...makePage(trailingresults, "2")
            ];

            const page1 = pageResults(items, 2, resultsPerPage);

            expect(page1.length).to.equal(trailingresults);
            page1.forEach(element => {
                expect(element.page).to.equal("2");
            });

        });

        it("handles zeroth", function () {
            const resultsPerPage = 10;

            const trailingresults = 5;

            const items = [
                ...makePage(resultsPerPage, "1"),
                ...makePage(trailingresults, "2")
            ];

            const page = pageResults(items, 0, resultsPerPage);
            expect(page.length).to.equal(0);
        });

        it("handles out of range", function () {
            const resultsPerPage = 10;

            const trailingresults = 5;

            const items = [
                ...makePage(resultsPerPage, "1"),
                ...makePage(trailingresults, "2")
            ];

            const page = pageResults(items, 3, resultsPerPage);
            expect(page.length).to.equal(0);
        });

        it("handles single page with less results", function () {
            const resultsPerPage = 10;

            const resultsOnThisPage = 5;

            const items = [
                ...makePage(resultsOnThisPage, "1")
            ];

            const page = pageResults(items, 1, resultsPerPage);
            expect(page.length).to.equal(resultsOnThisPage);
        });

        it("handles empty", function () {

            const page = pageResults(undefined, 1, 10);
            expect(page.length).to.equal(0);

            const page2 = pageResults([], 1, 10);
            expect(page2.length).to.equal(0);

        });

    });

    describe("pageNumbersFromCount", function () {

        it("returns expected values", function () {

            const tests = [
                {
                    count: 2,
                    result: [1, 2]
                },
                {
                    count: 1,
                    result: [1]
                },
                {
                    count: 5,
                    result: [1, 2, 3, 4, 5]
                }
            ];

            tests.forEach(test => {
                const pageNumbers = pageNumbersFromCount(test.count);
                expect(arrayCompare(pageNumbers, test.result)).to.equal(true);
            });

        });

    });


});