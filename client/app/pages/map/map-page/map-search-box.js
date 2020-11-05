import PropTypes from "prop-types";
import React from "react";

import LocationFolder from "../location-folder";
import SearchResultPaginator from "../pagination/search-results-paginator";

import supportedKeys from "../../../core/text/supported-keys";

function getText(text) {
    return {
        result: text[supportedKeys.mapResult],
        results: text[supportedKeys.mapResults],
        pages: text[supportedKeys.mapPages],
        placeholder: text[supportedKeys.mapSearchPlaceholder]
    };
}

class MapSearchBox extends React.Component {

    render() {

        const {
            text,
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

        const {
            result,
            results,
            pages,
            placeholder
        } = getText(text);

        const resultLabel = (totalCount == 1) ? result : results;
        const page = (pageCount > 1)
            ? pages
            : "";

        return (
            <div className="map-search-box">

                <div>
                    <div className="text-center">
                        <input type="text"
                            className="text-box unbordered"
                            onChange={searchValueDidChange}
                            value={searchText}
                            placeholder={placeholder} />
                    </div>
                    <div className="text-center" style={{ width: "100%" }}>
                        {totalCount} {resultLabel}
                    </div>
                </div>

                <LocationFolder text={text}
                    locations={pageResults}
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
    text: PropTypes.object.isRequired,
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