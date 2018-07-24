/* global describe it */

const expect = require("chai").expect;
const submissionStates = require("../client/app/core/model/submission").submissionStates;
const hasSubmissions = require("../client/app/core/model/submission").hasSubmissions;
const hasPending = require("../client/app/core/model/submission").hasPending;
const submissionsFromState = require("../client/app/core/model/submission").submissionsFromState;
const matchesPreviousSubmission = require("../client/app/core/model/submission").matchesPreviousSubmission;

const makeState = function (submissions = []) {
    return submissions.reduce((acc, current) => {
        acc[current.coordinateHash] = current;
        return acc;
    }, {});
};

describe("submission", function () {

    describe("hasSubmissions", function () {

        it("handles submissions", function () {

            const state = makeState([{ coordinateHash: "12345" }, { coordinateHash: "23456" }]);
            const result = hasSubmissions(state);

            expect(result).to.equal(true);

        });

        it("handles no submissions", function () {

            const state = makeState();
            const result = hasSubmissions(state);

            expect(result).to.equal(false);

        });

    });

    describe("hasPending", function () {

        it("handles pending submissions", function () {

            const state = makeState([
                { coordinateHash: "1223", status: submissionStates.sending },
                { coordinateHash: "2345", status: submissionStates.success },
                { coordinateHash: "3456", status: submissionStates.failure },
            ]);

            const result = hasPending(state);

            expect(result).to.equal(true);

        });

        it("handles no pending submissions", function () {

            const state = makeState([
                { status: submissionStates.success },
                { status: submissionStates.success },
                { status: submissionStates.success }
            ]);

            const result = hasPending(state);

            expect(result).to.equal(false);

        });

    });

    describe("submissionsFromState", function () {

        it("returns an array with the submissions", function () {

            const state = makeState([
                { coordinateHash: "1223", status: submissionStates.sending },
                { coordinateHash: "2345", status: submissionStates.success },
                { coordinateHash: "3456", status: submissionStates.failure },
            ]);

            const submissions = submissionsFromState(state);

            expect(submissions.length).to.equal(Object.keys(state).length);


        });

    });

    describe("matchesPreviousSubmission", function () {

        it("handles postive case", function () {

            const coordinateHash = "1234";

            const state = makeState([
                {coordinateHash: coordinateHash, status: submissionStates.success},
                {coordinateHash: "2345", status: submissionStates.success},
                {coordinateHash: "3456", status: submissionStates.success}
            ]);

            expect(matchesPreviousSubmission(coordinateHash, state)).to.equal(true);

        });

        it("handles negative case", function () {

            const state = makeState([
                {coordinateHash: "1234", status: submissionStates.success},
                {coordinateHash: "2345", status: submissionStates.success},
                {coordinateHash: "3456", status: submissionStates.success}
            ]);

            expect(matchesPreviousSubmission("4566", state)).to.equal(false);

        });

    });

});