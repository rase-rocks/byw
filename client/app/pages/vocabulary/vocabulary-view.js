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

class VocabularyView extends React.Component {

    render() {

        const { onChange,
            units,
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
    units: PropTypes.array.isRequired,
    searchText: PropTypes.string.isRequired,
    currentTranslationUnitsCount: PropTypes.number.isRequired,
    targetTranslationUnitsCount: PropTypes.number.isRequired
};

export default VocabularyView;