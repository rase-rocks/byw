import PropTypes from "prop-types";
import React from "react";

class Error extends React.Component {
    render() {
        return (
            <span style={{color: "red"}}>
                <small>{this.props.text || (<span>&nbsp;</span>)}</small>
            </span>
        );
    }
}

Error.propTypes = {
    text: PropTypes.string
};

export default Error;