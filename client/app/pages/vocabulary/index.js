import React from "react";

import geirfaData from "./geirfa.json";
import makeGeirfa from "../../core/model/geirfa";
import eventTargetValue from "../../core/event-target-value";

import VocabularyView from "./vocabulary-view";

const evt = eventTargetValue();
const geirfa = makeGeirfa(geirfaData);
const tags = geirfa.tags;

const currentTranslationUnitsCount = geirfaData.length;
const targetTranslationUnitsCount = 7000;

function makeChangeHandler(component, geirfaObj) {
    return function (searchText) {
        const units = geirfaObj.findMatches(searchText);
        component.setState({ units, searchText });
    };
}

class VocabularyController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            units: geirfa.select(50),
            searchText: ""
        };
    }

    makeOnChange() {

        const handler = makeChangeHandler(this, geirfa);

        return function (e) {
            const searchText = evt(e);
            handler(searchText);
        };

    }

    makeOnClickTag() {
        return makeChangeHandler(this, geirfa);
    }

    render() {
        return (
            <VocabularyView onChange={this.makeOnChange()}
                onClickTag={this.makeOnClickTag()}
                units={this.state.units}
                tags={tags}
                searchText={this.state.searchText}
                currentTranslationUnitsCount={currentTranslationUnitsCount}
                targetTranslationUnitsCount={targetTranslationUnitsCount} />
        );
    }
}

export default VocabularyController;