import PropTypes from "prop-types";
import React from "react";

import bindMethods from "../../../core/bind-methods";
import floatValue from "../../../core/model/float-value";
import Map from "../map";
import MapSearchBox from "./map-search-box";

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
            locations,
            pageResults,
            selectedLocation,
            onShowLocation,
            onReview
        } = this.props;

        return (
            <div className="map-container">
                <Map locations={locations}
                    filteredResults={pageResults}
                    selectedLocation={selectedLocation}
                    onShowLocation={onShowLocation}
                    onReview={onReview} />
                <MapSearchBox {...this.props} />
            </div>
        );
    }
}

MapPage.propTypes = {
    locations: PropTypes.array.isRequired,
    totalCount: PropTypes.number.isRequired,
    pageResults: PropTypes.array.isRequired,
    pageCount: PropTypes.number.isRequired,
    currentPageNo: PropTypes.number.isRequired,
    selectedLocation: PropTypes.object,
    searchText: PropTypes.string,
    searchDistance: PropTypes.number,
    searchValueDidChange: PropTypes.func.isRequired,
    searchDistanceDidChange: PropTypes.func.isRequired,
    onShowLocation: PropTypes.func.isRequired,
    onReview: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default MapPage;