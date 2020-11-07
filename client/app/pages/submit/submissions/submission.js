import PropTypes from "prop-types";
import React from "react";

import { formattedPercentage, formattedDescription } from "../../../core/model/form/category";

const statusClassName = function (status) {
    return `submit-status ${status}`;
};

class Submission extends React.Component {
    render() {

        const { text, submission } = this.props;

        return (
            <tr>
                <td>
                    {submission.name}
                </td>
                <td>
                    {formattedPercentage(submission.category)}
                </td>
                <td>
                    {formattedDescription(submission.category, text)}
                </td>
                <td>
                    <span className={statusClassName(submission.status)}>
                        {submission.status}
                    </span>
                </td>
            </tr>
        );
    }
}

Submission.propTypes = {
    text: PropTypes.object.isRequired,
    submission: PropTypes.object.isRequired
};

export default Submission;