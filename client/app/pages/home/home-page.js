import PropTypes from "prop-types";
import React from "react";

import Features from "./features";
import HomeHero from "./hero";
import PromotionDivider from "./promotion-divider";
import Services from "./services";

class Home extends React.Component {
    render() {

        const { text } = this.props;

        return (
            <div className="full-page-content">

                <HomeHero text={text}/>

                <Features />

                <Services />

                <PromotionDivider />

            </div>
        );
    }
}

Home.propTypes = {
    text: PropTypes.object.isRequired,
    featuredLocation: PropTypes.object
};

export default Home;