import React from "react";
import PropTypes from "prop-types";
import children from "../../core/props-children";
import isBrowser from "../../core/is-browser";
import toURL from "../FetchableImage/to-url";
import { handler, backStyle } from "../FetchableImage";
import trim from "../../core/model/geirfa/trim";

const containerStyle = {
    width: "100%",
    height: "100%"
};

export const combineStyles = function (styles) {

    if (!Array.isArray(styles)) { return {}; }

    return styles.reduce((style, additionalStyle) =>
        Object.assign({}, style, additionalStyle), {});

};

export const combineClasses = function (classes) {

    if (classes === undefined) { return ""; }

    if (typeof classes === "string") { return classes; }

    if (!Array.isArray(classes)) { return classes; }

    return trim(classes
        .join(" "));
};

class FetchableContainer extends React.Component {

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
                console.log("Unable to download and parse image for section background", err);
            });
    }

    render() {

        const { children, backgroundColor, classes } = this.props;

        const style = combineStyles([backStyle(this.state.url, backgroundColor), containerStyle]);
        const propsClasses = classes || "";

        const className = combineClasses(["image-transition-background", propsClasses]);

        return (
            <div className={className} style={style}>

                {children}

            </div>
        );
    }

}

FetchableContainer.propTypes = {
    children: children,
    url: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    classes: PropTypes.string
};

export default FetchableContainer;