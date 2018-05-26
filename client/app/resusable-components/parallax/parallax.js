import React from "react";
import PropTypes from "prop-types";

import children from "../../core/props-children";

const parallaxHeight = function (percent) {
    return {
        height: percent + "vh"
    };
};

class Parallax extends React.Component {
    render() {
        return (
            <div className="parallax" style={parallaxHeight(this.props.heightPercent)}>
                {this.props.children}
            </div>
        );
    }
}

Parallax.propTypes = {
    heightPercent: PropTypes.number,
    children: children
};

export default Parallax;