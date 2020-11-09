import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import text from "../../../core/text/data";
import supportedLanguages from "../../../core/text/supported-languages";
import LanguageSelector from "./language-selector";

import { setLanguageAction } from "../../../core/redux/actions";

const languages = Object.keys(supportedLanguages);

class LanguageSelectorController extends React.Component {

    makeOnLanguageSelect() {
        const self = this;
        return function (language) {
            const action = setLanguageAction(language);
            self.props.dispatch(action);
        };
    }

    render() {

        const { language } = this.props;
        const content = text[language];

        return (
            <LanguageSelector text={content}
                language={language}
                supportedLanguages={languages}
                onLanguageSelect={this.makeOnLanguageSelect()} />
        );
    }

}

LanguageSelectorController.propTypes = {
    language: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = function (state) {
    return {
        language: state.settings.language
    };
};

export default connect(mapStateToProps)(LanguageSelectorController);