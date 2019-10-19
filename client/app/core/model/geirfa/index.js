import { whitespaceStartRe, whitespaceEndRe } from "../regular-expressions";

function trim(str) {
    return str.replace(whitespaceStartRe, "").replace(whitespaceEndRe, "");
}

function unitsEqual(unit1, unit2) {
    return unit1.en === unit2.en &&
        unit2.cy === unit2.cy;
}

function unitContainsText(unit, text) {

    const wordMatches = (~unit.en.toLowerCase().indexOf(text) || ~unit.cy.toLowerCase().indexOf(text)) 
        ? true 
        : false;

    const tagMatches = unit.tags.filter((tag) => { return tag.indexOf(text) != -1; });

    return wordMatches || tagMatches.length > 0;

}

function makeUnitContainsTextFilter(text) {

    const trimmedText = trim(text).toLowerCase();

    return function (unit) {
        return unitContainsText(unit, trimmedText) ;
    };

}

function makeGeirfa(data) {
    return {
        all: function () {
            return data;
        },
        findMatches: function (text) {
            return data.filter(makeUnitContainsTextFilter(text));
        },
        unitsEqual: unitsEqual
    };
}

export { trim, unitsEqual, unitContainsText };
export default makeGeirfa;