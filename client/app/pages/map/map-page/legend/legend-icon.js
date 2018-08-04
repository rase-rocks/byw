import PropTypes from "prop-types";
import React from "react";

const flagPoleRGB = "rgb(100,100,100)";

class LegendIcon extends React.Component {
    render() {
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="41">
                <path stroke={flagPoleRGB}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    fill="none"
                    d="M 18.92,32.09 C 23.78,33.12 24.96,35.14 21.56,36.61 18.15,38.08 11.45,38.44 6.58,37.41 1.72,36.38 0.54,34.36 3.94,32.89 4.37,32.7 4.87,32.53 5.42,32.37" />
                <path stroke="none"
                    fill={this.props.flagRGB}
                    d="M 13,11 L 28,9 19.82,6 28,4 13,2 13,11 Z M 13,11" />
                <path stroke={flagPoleRGB}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    fill={flagPoleRGB}
                    d="M 12.5,33.5 L 12.5,2.5" />
            </svg>
        );
    }
}

LegendIcon.propTypes = {
    flagRGB: PropTypes.string.isRequired
};

export default LegendIcon;