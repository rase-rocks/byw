import React from "react";

import children from "../../core/props-children";

class ParallaxGroup extends React.Component {
    render() {
        return (
            <div className="parallax-group">
                {this.props.children}
            </div>
        );
    }
}

ParallaxGroup.propTypes = {
    children: children
};

export default ParallaxGroup;