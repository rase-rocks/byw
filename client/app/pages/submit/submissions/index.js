import PropTypes from "prop-types";
import React from "react";

import Submission from "./submission";
import supportedKeys from "../../../core/text/supported-keys";

const k = supportedKeys;

const key = function (submission) {
    return `submission-display-${submission.coordinateHash}`;
};

export function getText(t) {
    return {
        name: t[k.submitName],
        category: t[k.submitCategory],
        status: t[k.submitStatus]
    };
}

class Submissions extends React.Component {
    render() {

        const { text, submissions } = this.props;

        const {
            name,
            category,
            status
        } = getText(text);

        const rows = submissions.map(submission => (<Submission key={key(submission)}
            text={text}
            submission={submission} />));

        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>{name}</th>
                                <th>{category}</th>
                                <th></th>
                                <th>{status}</th>
                            </tr>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

Submissions.propTypes = {
    text: PropTypes.object.isRequired,
    submissions: PropTypes.array.isRequired
};

export default Submissions;