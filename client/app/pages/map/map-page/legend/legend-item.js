import PropTypes from "prop-types";
import React from "react";
import LegendIcon from "./legend-icon";

class LegendItem extends React.Component {
    render() {
        
        return (
            <div className="col-md-2 text-center">
                <LegendIcon flagRGB={this.props.category.color}/>
                <p><small>{this.props.category.title}</small></p>
            </div>
        );
    }
}

LegendItem.propTypes = {
    category: PropTypes.object.isRequired
};

export default LegendItem;