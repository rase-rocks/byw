import React from "react";
import PropTypes from "prop-types";

import FetchableSectionBackground from "../../resusable-components/FetchableSectionBackground";
import colors from "../../core/colors";
import HeroSearchBar from "./hero-search-bar";
import supportedKeys from "../../core/text/supported-keys";

export function getText(text) {
    return {
        crowdSourced: text[supportedKeys.homeCrowdSourced],
        welsh: text[supportedKeys.homeWelsh],
        languageResource: text[supportedKeys.homeLanguageResource],
        lets: text[supportedKeys.homeLets],
        find: text[supportedKeys.homeFind],
        somewhere: text[supportedKeys.homeSomewhere],
        title: text[supportedKeys.homeHeroTitle]
    };
}

class HomeHero extends React.Component {
    render() {

        const { text } = this.props;

        const {
            crowdSourced,
            welsh,
            languageResource,
            lets,
            find,
            somewhere,
            title
        } = getText(text);

        return (
            <FetchableSectionBackground backgroundColor={colors.mountainGreen}
                url="assets/images/leo-sammarco-37818-unsplash.jpg"
                classes="hero d-flex align-items-center">
                <div className="container">

                    <p className="small-text-hero">
                        <i className="icon-localizer text-primary mr-1"></i>
                        {crowdSourced}
                        <span className="text-primary">&nbsp;{welsh}&nbsp;</span>
                        {languageResource}
                    </p>

                    <h1>
                        {lets}
                        <span className="text-primary">
                            &nbsp;{find}&nbsp;
                        </span>
                        {somewhere}
                    </h1>

                    <p className="text-hero">{title}</p>
                    
                    <HeroSearchBar text={text}/>
                    
                </div>
            </FetchableSectionBackground>
        );
    }
}

HomeHero.propTypes = {
    text: PropTypes.object.isRequired
};

export default HomeHero;