import React from "react";
import children from "../../core/props-children";

class ParallaxLayerTop extends React.Component {
    render() {
        return (
            <div className="parallax__layer parallax__layer--base">

                {this.props.children}

            </div>
        );
    }
}

ParallaxLayerTop.propTypes = {
    children: children
};

export default ParallaxLayerTop;