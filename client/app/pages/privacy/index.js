import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import text from "../../core/text/data";
import Privacy from "./privacy";

class PrivacyController extends React.Component {

    render() {

        const { language } = this.props;
        const content = text[language];

        return (
            <Privacy text={content} />
        );

    }
}

PrivacyController.propTypes = {
    language: PropTypes.string.isRequired
};

const mapStateToProps = function (state) {
    return {
        language: state.settings.language
    };
};

export default connect(mapStateToProps)(PrivacyController);