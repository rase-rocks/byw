import PropTypes from "prop-types";
import React from "react";

import bindMethods from "../../core/bind-methods";
import LocationFolder from "./location-folder";
import Map from "./map";
import SearchResultPaginator from "./pagination/search-results-paginator";
import floatValue from "../../core/model/float-value";

class MapSearchBox extends React.Component {

    render() {

        const {
            searchValueDidChange,
            searchText,
            totalCount,
            pageCount,
            pageResults,
            onShowLocation,
            onReview,
            onPageChange,
            currentPageNo
        } = this.props;

        const result = (totalCount == 1) ? "Result" : "Results";
        const page = (pageCount > 1)
            ? "Pages"
            : "";

        return (
            <div className="map-search-box">

                <div>
                    <div className="text-center">
                        <input type="text"
                            className="text-box unbordered"
                            onChange={searchValueDidChange}
                            value={searchText}
                            placeholder="Search for places, coordinates and postcodes" />
                    </div>
                    <div className="text-center" style={{ width: "100%" }}>
                        {totalCount} {result}
                    </div>
                </div>

                <LocationFolder locations={pageResults}
                    onShowLocation={onShowLocation}
                    onReview={onReview} />

                <div className="text-center"
                    style={{ marginTop: "10px", marginBottom: "10px", padding: "20px" }}>
                    <p>
                        {page}
                    </p>
                    <SearchResultPaginator onPageChange={onPageChange}
                        pageCount={pageCount}
                        currentPageNo={currentPageNo} />
                </div>

            </div>
        );
    }
}

MapSearchBox.propTypes = {
    totalCount: PropTypes.number.isRequired,
    pageResults: PropTypes.array.isRequired,
    pageCount: PropTypes.number.isRequired,
    currentPageNo: PropTypes.number.isRequired,
    searchText: PropTypes.string,
    searchDistance: PropTypes.number,
    searchValueDidChange: PropTypes.func.isRequired,
    searchDistanceDidChange: PropTypes.func.isRequired,
    onShowLocation: PropTypes.func.isRequired,
    onReview: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired
};

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
            pageResults,
            selectedLocation,
            onShowLocation
        } = this.props;

        return (
            <div className="map-container">
                <Map filteredResults={pageResults}
                    selectedLocation={selectedLocation}
                    onShowLocation={onShowLocation} />
                <MapSearchBox {...this.props} />
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
    onReview: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default MapPage;