/* global describe it*/

const expect = require("chai").expect;
const settingsReducer = require("../client/app/core/redux/reducers/settings-reducer").default;
const { setLanguageAction } = require("../client/app/core/redux/actions");

describe("Settings Reducer", function () {

    it("handles set language action", function () {

        const action = setLanguageAction("indonesian");
        const state = settingsReducer(undefined, action);

        expect(state.language).to.be.equal(action.payload);

    });

});