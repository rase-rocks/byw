import PropTypes from "prop-types";
import React from "react";

import Hero from "../../resusable-components/hero";
import Quote from "../../resusable-components/quote";

class Home extends React.Component {
    render() {

        return (
            <div className="full-page-content">

                <Hero backgroundUrl=""
                    initialBgColor="white"
                    heightPercent={40}>

                    <div className="hero-caption">
                        <div className="hero-text">

                            <h2>Breath Your Welsh</h2>
                            <h4>Crowd sourced Welsh Language Resource</h4>

                        </div>
                    </div>

                </Hero>

                <div className="container half-page-content">
                    <div className="row">
                        <div className="col-md-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nibh erat, vulputate et sapien nec, bibendum porta erat. Quisque placerat at diam nec congue. Donec dapibus est quam, a pellentesque lectus feugiat in. Cras in lectus id ligula varius ullamcorper vitae vel nisl.
                        </div>
                        <div className="col-md-4">
                            Vestibulum enim arcu, pharetra consectetur consequat id, malesuada nec turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent non arcu porttitor, maximus dui at, convallis nisi. Fusce tristique lacus nec sem cursus sodales.
                        </div>
                        <div className="col-md-4">
                            Integer vel tincidunt velit. Cras in nisl ut nisi viverra consectetur eu ut ipsum. Nullam tempor enim augue, eu malesuada nisi tempus sit amet. Donec dictum euismod quam, at dapibus ante varius et. Morbi gravida mi a mi vestibulum sodales.
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