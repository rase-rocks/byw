import React from "react";
import Hero from "../../resusable-components/hero";
import Quote from "../../resusable-components/quote";
import colors from "../../core/colors";

const cssFilters = ["blur(5px)"];

const color = colors.homeHeroBackgroundColor;

class Home extends React.Component {
    render() {
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
                            <h2>The containerised content</h2>
                        </div>
                    </div>
                </div>

                <Quote/>
            </div>
        );
    }
}

export default Home;