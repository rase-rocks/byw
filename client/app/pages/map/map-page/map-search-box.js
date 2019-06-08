import PropTypes from "prop-types";
import React from "react";

import LocationFolder from "../location-folder";
import SearchResultPaginator from "../pagination/search-results-paginator";

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

export default MapSearchBox;