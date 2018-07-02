import PropTypes from "prop-types";
import React from "react";

import Features from "./features";
import HomeHero from "./hero";
import PromotionDivider from "./promotion-divider";
import Services from "./services";

class Home extends React.Component {
    render() {

        return (
            <div className="full-page-content">

                <HomeHero />

                <Features />

                <Services />

                <PromotionDivider />

            </div>
        );
    }
}

Home.propTypes = {
    featuredLocation: PropTypes.object
};

export default Home;