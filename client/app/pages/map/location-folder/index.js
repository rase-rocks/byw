import PropTypes from "prop-types";
import React from "react";

import LocationFolder from "./location-folder";

class LocationFolderController extends React.Component {

    render() {

        const { locations, onShowLocation, onReview } = this.props;

        return (
            <LocationFolder
                locations={locations}
                onShowLocation={onShowLocation}
                onReview={onReview} />
        );
    }
}

LocationFolderController.propTypes = {
    locations: PropTypes.array.isRequired,
    onShowLocation: PropTypes.func.isRequired,
    onReview: PropTypes.func.isRequired
};

export default LocationFolderController;