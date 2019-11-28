import sample from "../array-sample";
import trim from "./trim";
import unitsEqual from "./units-equal";
import unitContainsText from "./unit-contains-text";
import tweetableUnit from "./tweetable-unit";
import tags from "./tags";
import select from "./select";

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
        select: function (num) {
            return select(num, data);
        },
        tags: tags(data),
        findMatches: function (text) {
            return data.filter(makeUnitContainsTextFilter(text));
        },
        randomTweet: function () {
            return tweetableUnit(sample(data));
        },
        unitsEqual: unitsEqual
    };

}

export { trim, unitsEqual, unitContainsText };
export default makeGeirfa;