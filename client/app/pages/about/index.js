import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import About from "./about";
import text from "../../core/text/data";

class AboutController extends React.Component {

    render() {

        const { language } = this.props;
        const content = text[language];

        return (
            <About text={content} />
        );

    }
}

AboutController.propTypes = {
    language: PropTypes.string.isRequired
};

const mapStateToProps = function (state) {
    return {
        language: state.settings.language
    };
};

export default connect(mapStateToProps)(AboutController);