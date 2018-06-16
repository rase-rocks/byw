import PropTypes from "prop-types";
import React from "react";

import bindMethods from "../../core/bind-methods";
import LocationFolder from "./location-folder";
import Map from "./map";
import SearchResultPaginator from "./search-results-paginator";
import floatValue from "../../core/model/float-value";

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
            totalCount,
            pageResults,
            pageCount,
            currentPageNo,
            selectedLocation,
            searchText,
            searchValueDidChange,
            onShowLocation
        } = this.props;

        return (

            <div className="map-grid-container">

                <div className="map-item">
                    <Map filteredResults={pageResults} selectedLocation={selectedLocation} />
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
                            <LocationFolder locations={pageResults} onShowLocation={onShowLocation} />

                        </div>
                        <div style={{ marginTop: "10px", marginBottom: "10px", padding: "20px" }}>
                            <SearchResultPaginator totalCount={totalCount}
                                pageCount={pageCount}
                                currentPageNo={currentPageNo} />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

MapPage.propTypes = {
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
    onPageChange: PropTypes.func.isRequired
};

export default MapPage;