import React from "react";
import PropTypes from "prop-types";

import capitalise from "../../../core/model/string-capitalize-first-letter";

function makeOnClick(handler, language) {
    return function (e) {
        e.preventDefault();
        handler(language);
    };
}

function className(isCurrentLanguage) {
    return isCurrentLanguage ? "btn btn-primary" : "btn";
}

class LanguageButton extends React.Component {
    render() {

        const {
            isCurrentLanguage,
            language,
            onClick
        } = this.props;

        return (
            <button className={className(isCurrentLanguage)}
                onClick={makeOnClick(onClick, language)}>
                {capitalise(language)}
            </button>
        );
    }
}

LanguageButton.propTypes = {
    isCurrentLanguage: PropTypes.bool.isRequired,
    language: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default LanguageButton;