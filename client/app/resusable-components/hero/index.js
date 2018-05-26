import React from "react";
import PropTypes from "prop-types";
import children from "../../core/props-children";
import colors from "../../core/colors";

import {
    Parallax,
    ParallaxGroup,
    ParallaxLayerTop,
    ParallaxLayerBackground
} from "../parallax";

class Hero extends React.Component {

    render() {

        const {
            initialBgColor,
            backgroundUrl,
            heightPercent,
            cssFilters,
            children
        } = this.props;

        const backgroundColor = initialBgColor || colors.initialBackgroundColor;

        return (
            <section style={{backgroundColor: backgroundColor}}>

                <Parallax heightPercent={heightPercent}>
                    <ParallaxGroup>
                        <ParallaxLayerBackground
                            backgroundUrl={backgroundUrl}
                            backgroundColor={backgroundColor}
                            cssFilters={cssFilters} />
                        <ParallaxLayerTop>

                            {children}

                        </ParallaxLayerTop>
                    </ParallaxGroup>
                </Parallax>

            </section>
        );
    }
}


Hero.propTypes = {
    initialBgColor: PropTypes.string,
    backgroundUrl: PropTypes.string.isRequired,
    heightPercent: PropTypes.number.isRequired,
    cssFilters: PropTypes.array,
    children: children
};

export default Hero;