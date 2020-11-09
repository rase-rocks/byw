import PropTypes from "prop-types";
import React from "react";

import Features from "./features";
import HomeHero from "./hero";
import PromotionDivider from "./promotion-divider";
import Services from "./services";
import LanguageSelector from "./language-selector";

class Home extends React.Component {
    render() {

        const { text } = this.props;

        return (
            <div className="full-page-content">

                <HomeHero text={text}/>

                <Features text={text}/>

                <LanguageSelector />

                <Services text={text}/>

                <PromotionDivider text={text} />

            </div>
        );
    }
}

Home.propTypes = {
    text: PropTypes.object.isRequired,
    featuredLocation: PropTypes.object
};

export default Home;