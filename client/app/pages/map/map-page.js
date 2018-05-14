import React from "react";
import PropTypes from "prop-types";
import hash from "../../core/hash";
import FullPageMap from "./full-page-map";

class MapPage extends React.Component {
    render() {

        const locations = this.props.locations.map(location => (<p key={hash(location.name)}>{location.name}</p>));

        return (

            <div>

                <div style={{ width: "100%", height: "50vh" }}>
                    <FullPageMap />
                </div>

                <div className="container full-page-content">
                    <div className="row">
                        <div className="col-md-12">
                            {locations}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

MapPage.propTypes = {
    locations: PropTypes.array
};

export default MapPage;