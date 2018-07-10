import PropTypes from "prop-types";
import React from "react";

import LocationFolder from "./location-folder";

class LocationFolderController extends React.Component {
    render() {

        const { locations, onShowLocation } = this.props;

        return (
            <LocationFolder locations={locations} onShowLocation={onShowLocation}/>
        );
    }
}

LocationFolderController.propTypes = {
    locations: PropTypes.array.isRequired,
    onShowLocation: PropTypes.func.isRequired
};

export default LocationFolderController;