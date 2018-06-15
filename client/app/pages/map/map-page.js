import PropTypes from "prop-types";
import React from "react";

import bindMethods from "../../core/bind-methods";
import LocationFolder from "./location-folder";
import Map from "./map";

const floatValue = function (event) {
    return parseFloat(event.target.innerHTML);
};

/*
*
* TODO: Styles and media quieries for mobile and small screens
*
*/


class MapPage extends React.Component {

    constructor(props) {
        super(props);

        bindMethods(this, ["onClickDistanceChange"]);
    }

    onClickDistanceChange() {
        const self = this;
        return function (e) {
            self.props.searchDistanceDidChange(floatValue(e));
        };
    }

    render() {

        const {
            filteredResults,
            selectedLocation,
            searchText,
            searchValueDidChange,
            onShowLocation
        } = this.props;

        return (

            <div className="map-grid-container">

                <div className="map-item">
                    <Map filteredResults={filteredResults} selectedLocation={selectedLocation} />
                </div>

                <div className="map-item">

                    <div className="map-item-padding">

                        <div className="map-search-container">
                            <div>
                                <input type="text"
                                    className="text-box"
                                    onChange={searchValueDidChange}
                                    value={searchText}
                                    placeholder="Search for places, coordinates and postcodes" />
                            </div>
                        </div>

                        <div className="map-results-container">
                            <LocationFolder locations={filteredResults} onShowLocation={onShowLocation}/>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

MapPage.propTypes = {
    filteredResults: PropTypes.array,
    selectedLocation: PropTypes.object,
    searchText: PropTypes.string,
    searchDistance: PropTypes.number,
    searchValueDidChange: PropTypes.func.isRequired,
    searchDistanceDidChange: PropTypes.func.isRequired,
    onShowLocation: PropTypes.func.isRequired
};

export default MapPage;