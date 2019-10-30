import React from "react";

import geirfaData from "./geirfa.json";
import makeGeirfa from "../../core/model/geirfa";
import eventTargetValue from "../../core/event-target-value";

import VocabularyView from "./vocabulary-view";

const evt = eventTargetValue();
const geirfa = makeGeirfa(geirfaData);

const currentTranslationUnitsCount = geirfaData.length;
const targetTranslationUnitsCount = 5000;

class VocabularyController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            units: geirfa.all(),
            searchText: ""
        };
    }

    makeOnChange() {

        const self = this;

        return function (e) {
            const searchText = evt(e);
            const units = geirfa.findMatches(searchText);
            self.setState({ units, searchText });
        };
    }

    render() {
        return (
            <VocabularyView onChange={this.makeOnChange()}
                units={this.state.units}
                searchText={this.state.searchText}
                currentTranslationUnitsCount={currentTranslationUnitsCount}
                targetTranslationUnitsCount={targetTranslationUnitsCount} />
        );
    }
}

export default VocabularyController;