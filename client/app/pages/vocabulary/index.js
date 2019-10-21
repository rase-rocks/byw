import React from "react";

import PageContainer from "../../page-content";
import PageHeader from "../../resusable-components/page-header";
import VocabSearch from "./vocab-search";

import geirfaData from "./geirfa.json";
import makeGeirfa from "../../core/model/geirfa";
import eventTargetValue from "../../core/event-target-value";

const evt = eventTargetValue();
const geirfa = makeGeirfa(geirfaData);

const currentTranslationUnitsCount = geirfaData.length;
const targetTranslationUnitsCount = 5000;


class Vocabulary extends React.Component {

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

        const lines = this.state.units.map(function (unit) {
            return (
                <tr key={unit.id}>
                    <td>{unit.en}</td>
                    <td>{unit.cy}</td>
                    <td>{unit.notes}</td>
                </tr>
            );
        });

        return (
            <PageContainer>

                <PageHeader>
                    Vocabulary <small>Beta</small>
                </PageHeader>

                <p>
                    This is a beta version of an attempt to provide a searchable resource for commonly heard sayings.
                    Currently it has {currentTranslationUnitsCount} words and phrases out of a target of {targetTranslationUnitsCount}.
                </p>

                <VocabSearch onChange={this.makeOnChange()} value={this.state.searchText} />

                <p>{this.state.units.length} phrases and words found</p>

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
                        {lines}
                    </tbody>

                </table>


            </PageContainer>
        );
    }
}

export default Vocabulary;