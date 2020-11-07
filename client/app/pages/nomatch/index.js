import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Nomatch from "./nomatch";
import text from "../../core/text/data";

class NomatchController extends React.Component {

    render() {

        const { language } = this.props;
        const content = text[language];

        return (
            <Nomatch text={content} />
        );

    }
}

NomatchController.propTypes = {
    language: PropTypes.string.isRequired
};

const mapStateToProps = function (state) {
    return {
        language: state.settings.language
    };
};

export default connect(mapStateToProps)(NomatchController);