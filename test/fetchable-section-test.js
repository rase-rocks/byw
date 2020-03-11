/* global describe it */

const expect = require("chai").expect;

const combineStyles = require("../client/app/resusable-components/FetchableContainer").combineStyles;
const combineClasses = require("../client/app/resusable-components/FetchableContainer").combineClasses;

describe("FetchableSection", function () {

    describe("combineStyles", function () {

        it("correctly combines objects", function () {

            const containerStyle = {
                width: "100%",
                height: "100%"
            };

            const style2 = {
                opacity: 0.5
            };

            const style3 = {
                backgroundColor: "white"
            };

            const style = combineStyles([containerStyle, style2, style3]);

            expect(style.width).to.be.equal(containerStyle.width);
            expect(style.height).to.be.equal(containerStyle.height);
            expect(style.opacity).to.be.equal(style2.opacity);
            expect(style.backgroundColor).to.be.equal(style3.backgroundColor);

        });

        it("returns empty object for incorrect args", function () {

            const emptyObject = JSON.stringify({});

            expect(JSON.stringify(combineStyles())).to.be.equal(emptyObject);
            expect(JSON.stringify(combineStyles({}))).to.be.equal(emptyObject);
            expect(JSON.stringify(combineStyles({}, {}, ""))).to.be.equal(emptyObject);

        });

    });

    describe("combineClasses", function () {

        it("correctly combines valid arguments", function () {

            const initialClassName = "image-transition";
            const extraClasses = "table col etc";

            const className = combineClasses([initialClassName, extraClasses]);

            expect(className).to.be.equal(initialClassName + " " + extraClasses);

        });

        it("handles undefined className case", function () {

            const initialClassName = "image-transition";
            const extraClasses = undefined;
            const emptyClasses = "";

            const className = combineClasses([initialClassName, extraClasses, emptyClasses]);

            expect(className).to.be.equal(initialClassName);

        });

        it("handles empty names", function () {

            expect(combineClasses(["", ""])).to.be.equal("");

        });

        it("handles being passed undefined", function () {

            expect(combineClasses()).to.be.equal("");

        });

        it("handles being passed string classname", function () {

            const className = "col image-transition row";
            expect(combineClasses(className)).to.be.equal(className);

        });

    });

});