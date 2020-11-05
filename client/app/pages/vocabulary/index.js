import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import geirfaData from "./geirfa.json";
import makeGeirfa from "../../core/model/geirfa";
import eventTargetValue from "../../core/event-target-value";
import text from "../../core/text/data";

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

        const { language } = this.props;
        const content = text[language];

        return (
            <VocabularyView text={content}
                onChange={this.makeOnChange()}
                onClickTag={this.makeOnClickTag()}
                units={this.state.units}
                tags={tags}
                searchText={this.state.searchText}
                currentTranslationUnitsCount={currentTranslationUnitsCount}
                targetTranslationUnitsCount={targetTranslationUnitsCount} />
        );
    }
}

const mapStateToProps = function (state) {
    return {
        language: state.settings.language
    };
};

VocabularyController.propTypes = {
    language: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(VocabularyController);