import PropTypes from "prop-types";
import React from "react";

class Tr extends React.Component {
    render() {

        const {
            fileType,
            url, 
            filename,
            hash
        } = this.props;

        return (
            <tr>
                <td>{fileType}</td>
                <td>
                    <a href={url}
                        target="_blank"
                        rel="noreferrer noopener">
                        {filename}
                    </a>
                </td>
                <td>
                    <small>
                        {hash}
                    </small>
                </td>
            </tr>
        );
    }
}

Tr.propTypes = {
    fileType: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired
};

export default Tr;