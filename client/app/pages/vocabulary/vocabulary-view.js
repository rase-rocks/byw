import React from "react";
import PropTypes from "prop-types";

import PageContainer from "../../page-content";
import PageHeader from "../../resusable-components/page-header";
import VocabSearch from "./vocab-search";

import supportedKeys from "../../core/text/supported-keys";

function lines(units) {
    return units.map(function (unit) {
        return (
            <tr key={unit.id}>
                <td>{unit.en}</td>
                <td>{unit.cy}</td>
                <td>{unit.notes}</td>
            </tr>
        );
    });
}

function clickableTags(tags, onClickTag) {
    return tags.map(function (tag) {

        const clickHandler = function () {
            onClickTag(tag);
        };

        return (
            <span className="tag"
                key={`tag-${tag}`}
                onClick={clickHandler}>
                {tag}
            </span>
        );
    });
}

export function getText(text) {
    return {
        title: text[supportedKeys.vocabTitle],
        beta: text[supportedKeys.vocabBeta],
        p1: text[supportedKeys.vocabP1],
        p2: text[supportedKeys.vocabP2],
        p3: text[supportedKeys.vocabP3],
        resultsFound: text[supportedKeys.vocabResultsFound],
        english: text[supportedKeys.vocabEnglish],
        cymraeg: text[supportedKeys.vocabCymraeg],
        notes: text[supportedKeys.vocabNotes]
    };
}

class VocabularyView extends React.Component {

    render() {

        const {
            text,
            onChange,
            onClickTag,
            units,
            tags,
            searchText,
            currentTranslationUnitsCount,
            targetTranslationUnitsCount
        } = this.props;

        const {
            title,
            beta,
            p1,
            p2,
            p3,
            resultsFound,
            english,
            cymraeg,
            notes
        } = getText(text);

        return (
            <PageContainer>

                <PageHeader>
                    {title} <small>{beta}</small>
                </PageHeader>

                <p>
                    {p1}.&nbsp;
                    {p2} {currentTranslationUnitsCount} {p3} {targetTranslationUnitsCount}.
                </p>

                <div className="row tag-list">
                    <div className="col col-12">
                        {clickableTags(tags, onClickTag)}
                    </div>
                </div>

                <VocabSearch onChange={onChange} value={searchText} />

                <p>{units.length} {resultsFound}</p>

                <table className="table">
                    <tbody>
                        <tr>
                            <th>
                                {english}
                            </th>
                            <th>
                                {cymraeg}
                            </th>
                            <th>
                                {notes}
                            </th>
                        </tr>
                        {lines(units)}
                    </tbody>

                </table>


            </PageContainer>
        );
    }

}

VocabularyView.propTypes = {
    text: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onClickTag: PropTypes.func.isRequired,
    units: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    searchText: PropTypes.string.isRequired,
    currentTranslationUnitsCount: PropTypes.number.isRequired,
    targetTranslationUnitsCount: PropTypes.number.isRequired
};

export default VocabularyView;