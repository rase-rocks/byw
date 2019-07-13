import React from "react";

import PageContainer from "../../page-content";
import PageHeader from "../../resusable-components/page-header";

import geirfa from "./geirfa.json";

class Vocabulary extends React.Component {
    render() {

        const lines = geirfa.map(function(unit) {
            return (
                <tr key={JSON.stringify(unit)}>
                    <td>{unit.en}</td>
                    <td>{unit.cy}</td>
                    <td>{unit.notes}</td>
                </tr>
            );
        });

        return (
            <PageContainer>


                <PageHeader>
                    Vocabulary
                </PageHeader>

                <p>{geirfa.length} phrases and words</p>

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