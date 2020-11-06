/* global describe it */

const expect = require("chai").expect;

const addTextContent = require("../client/app/pages/map/map/add-text-content").default;

describe("addTextContent", function () {

    it("adds text without altering original props", function () {

        let originalProps = {
            language: "english",
            key: "value"
        };

        const updatedProps = addTextContent(originalProps);

        expect(originalProps).to.not.haveOwnProperty("showLabelText");
        expect(originalProps).to.not.haveOwnProperty("categoriseLabelText");

        expect(updatedProps).to.haveOwnProperty("showLabelText");
        expect(updatedProps).to.haveOwnProperty("categoriseLabelText");

        expect(updatedProps.key).to.be.equal(originalProps.key);

    });

});