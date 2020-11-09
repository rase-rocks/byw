import React from "react";
import PropTypes from "prop-types";
import { strHash } from "../../../core/hash";

import k from "../../../core/text/supported-keys";
import LanguageButton from "./language-button";

export function getText(t) {
    return {
        sectionTitle: t[k.homeLanguages],
        title: t[k.homeLanguageChoose]
    };
}

function makeButtons(supportedLanguages, currentLanguage, onClick) {
    return supportedLanguages.map(lang => {
        return (
            <LanguageButton key={strHash(`home-lang-${lang}-btn`)}
                isCurrentLanguage={lang === currentLanguage}
                language={lang}
                onClick={onClick} />
        );
    });
}

class LanguageSelector extends React.Component {

    render() {

        const {
            text,
            language,
            supportedLanguages,
            onLanguageSelect
        } = this.props;

        const {
            sectionTitle,
            title
        } = getText(text);

        const btns = makeButtons(supportedLanguages, language, onLanguageSelect);

        return (
            <section className="services">
                <div className="container text-center">
                    <header>
                        <h2>
                            <small>{sectionTitle}</small>
                            {title}
                        </h2>
                        <p className="lead col-md-10 mx-auto">

                        </p>
                    </header>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="language-button-row">
                                {btns}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
        );
    }
}

LanguageSelector.propTypes = {
    text: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    supportedLanguages: PropTypes.array.isRequired,
    onLanguageSelect: PropTypes.func.isRequired
};

export default LanguageSelector;