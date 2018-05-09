import React from "react";

import ResultRow from "./result-row";

import {strHash} from "../../../../core/hash";

const results = [
    {
        displayName: "A located place",
        url: ""
    },
    {
        displayName: "Another located place",
        url: ""
    }
];

class ResultsTable extends React.Component {
    render() {

        const rows = results.map((result) => { 
            return (<ResultRow key={strHash(result.displayName)} {...result}/>); 
        });

        return (
            <table className="table">
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

export default ResultsTable;