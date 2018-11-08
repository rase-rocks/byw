import React from "react";
import PropTypes from "prop-types";

import isBrowser from "../../core/is-browser";
import colors from "../../core/colors";
import toURL from "./to-url";

//import "whatwg-fetch";

// const isFirefox = function () {
//     return typeof InstallTrigger !== "undefined";
// };

export const handler = function (comp) {
    return function (dataUrl) {
        setTimeout(function () {
            comp.setState({ url: dataUrl });
        }, 5);
    };
};

export const backStyle = function (urlString = "",
    backgroundColor = colors.darkBackgroundColor,
    cssFilters = []) {
    return {
        backgroundImage: urlString,
        backgroundColor: backgroundColor,
        opacity: (urlString) ? "1" : "0",
        filter: cssFilters.join(" ")
    };
};

class FetchableImage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            url: undefined
        };

    }

    componentDidMount() {
        if (!isBrowser()) { return; }

        toURL(this.props.url)
            .then(handler(this))
            .catch(function (err) {
                console.log("Unable to download and parse image for hero", err);
            });
    }


    render() {
        const { backgroundColor, cssFilters, alt } = this.props;

        const srText = (alt) ? (<span className="sr-only">{alt}</span>) : null;

        return (
            <div className="image-transition-background"
                style={backStyle(this.state.url, backgroundColor, cssFilters)}>
                {srText}
            </div>
        );
    }
}

FetchableImage.propTypes = {
    backgroundColor: PropTypes.string,
    url: PropTypes.string,
    cssFilters: PropTypes.array,
    alt: PropTypes.string
};

export default FetchableImage;