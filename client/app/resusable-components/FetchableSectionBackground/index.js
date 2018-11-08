import React from "react";
import PropTypes from "prop-types";

import isBrowser from "../../core/is-browser";

import toURL from "../FetchableImage/to-url";
import colors from "../../core/colors";
import children from "../../core/props-children";
import { backStyle, handler } from "../FetchableImage";

//import "whatwg-fetch";

const classNames = function (extraClasses) {
    return `image-transition-background ${extraClasses}`;
};

class FetchableSectionBackground extends React.Component {

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
                console.log("Unable to download and parse image section", err);
            });
    }


    render() {
        const { backgroundColor, classes, children } = this.props;
        const color = backgroundColor || colors.darkBackgroundColor;
        return (
            <div style={{backgroundColor: color}}>
                <section className={classNames(classes)}
                    style={backStyle(this.state.url, backgroundColor)}>
                    {children}
                </section>
            </div>

        );
    }
}

FetchableSectionBackground.propTypes = {
    backgroundColor: PropTypes.string,
    url: PropTypes.string,
    classes: PropTypes.string,
    children: children
};

export default FetchableSectionBackground;