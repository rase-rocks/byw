import PropTypes from "prop-types";
import React from "react";

import Submission from "./submission";

const key = function (submission) {
    return `submission-display-${submission.coordinateHash}`;
};

class Submissions extends React.Component {
    render() {

        const rows = this.props.submissions.map(submission => {
            return (<Submission key={key(submission)} submission={submission}/>);
        });

        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th></th>
                                <th>Status</th>
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
    submissions: PropTypes.array.isRequired
};

export default Submissions;