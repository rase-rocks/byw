import PropTypes from "prop-types";
import React from "react";

import colors from "../../core/colors";
import Featured from "./featured";
import Hero from "../../resusable-components/hero";
import Quote from "../../resusable-components/quote";

const cssFilters = ["blur(5px)"];

const color = colors.homeHeroBackgroundColor;

class Home extends React.Component {
    render() {

        const { featuredLocation } = this.props;

        return (
            <div className="full-page-content">

                <Hero backgroundUrl="/assets/images/mitchell-orr-204820-unsplash.jpg"
                    initialBgColor={color}
                    cssFilters={cssFilters}
                    heightPercent={70}>

                    <div className="hero-caption">
                        <div className="hero-text">

                            <h2>Breath Your Welsh</h2>

                        </div>
                    </div>

                </Hero>

                <div className="container half-page-content">
                    <div className="row">
                        <div className="col-md-12">
                            {(featuredLocation) ?
                                (<Featured location={featuredLocation} />) :
                                null}
                        </div>
                    </div>
                </div>

                <Quote />
            </div>
        );
    }
}

Home.propTypes = {
    featuredLocation: PropTypes.object
};

export default Home;