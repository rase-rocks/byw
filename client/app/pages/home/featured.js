import PropTypes from "prop-types";
import React from "react";

class Featured extends React.Component {
    render() {

        const { location } = this.props;

        return (
            <div style={{ marginTop: "50px" }}>
                <h2>Featured Location</h2>
                <br />
                <h3>{location.name}</h3>
                <p>{location.address}</p>
                <p>
                    <small>Category: </small> {location.category}
                </p>
            </div>
        );
    }
}

Featured.propTypes = {
    location: PropTypes.object.isRequired
};

export default Featured;