import React from "react";
import PropTypes from "prop-types";

class ResultRow extends React.Component {
    render() {
        return (
            <tr className="result-row">
                <td>
                    {this.props.displayName}
                </td>
                <td>
                    <button className="btn btn-outline-secondary" type="button">Go</button>
                </td>
            </tr>
        );
    }
}

ResultRow.propTypes = {
    displayName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};

export default ResultRow;