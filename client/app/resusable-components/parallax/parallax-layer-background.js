import React from "react";
import PropTypes from "prop-types";
import FetchableImage from "../FetchableImage";

const CLASSES = "parallax__layer parallax__layer--back";

class ParallaxLayerBackground extends React.Component {

    render() {

        const {
            backgroundUrl,
            backgroundColor,
            cssFilters
        } = this.props;

        return (
            <div className={CLASSES}>
                <FetchableImage url={backgroundUrl}
                    backgroundColor={backgroundColor}
                    cssFilters={cssFilters} />
            </div>
        );
    }
}

ParallaxLayerBackground.propTypes = {
    backgroundUrl: PropTypes.string,
    backgroundColor: PropTypes.string,
    cssFilters: PropTypes.array
};

export default ParallaxLayerBackground;