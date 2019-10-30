import React from "react";
import PropTypes from "prop-types";

import PageContainer from "../../page-content";
import PageHeader from "../../resusable-components/page-header";
import VocabSearch from "./vocab-search";

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

        const clickHandler = function() {
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

class VocabularyView extends React.Component {

    render() {

        const { onChange,
            onClickTag,
            units,
            tags,
            searchText,
            currentTranslationUnitsCount,
            targetTranslationUnitsCount } = this.props;

        return (
            <PageContainer>

                <PageHeader>
                    Vocabulary <small>Beta</small>
                </PageHeader>

                <p>
                    This is a beta version of an attempt to provide a searchable resource for commonly heard sayings.
                    Currently it has {currentTranslationUnitsCount} words and phrases out of a target of {targetTranslationUnitsCount}.
                </p>

                <VocabSearch onChange={onChange} value={searchText} />

                <p>{units.length} phrases and words found</p>

                <div className="row tag-list">
                    <div className="col col-12">
                        {clickableTags(tags, onClickTag)}
                    </div>
                </div>

                <table className="table">
                    <tbody>
                        <tr>
                            <th>
                                English
                            </th>
                            <th>
                                Cymraeg
                            </th>
                            <th>
                                Notes
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
    onChange: PropTypes.func.isRequired,
    onClickTag: PropTypes.func.isRequired,
    units: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    searchText: PropTypes.string.isRequired,
    currentTranslationUnitsCount: PropTypes.number.isRequired,
    targetTranslationUnitsCount: PropTypes.number.isRequired
};

export default VocabularyView;