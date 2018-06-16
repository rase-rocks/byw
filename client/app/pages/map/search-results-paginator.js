import PropTypes from "prop-types";
import React from "react";

class SearchResultPaginator extends React.Component {
    render() {
        return (
            <div>
                on page {this.props.currentPageNo} of {this.props.pageCount} with {this.props.totalCount} results
            </div>
        );
    }
}

SearchResultPaginator.propTypes = {
    totalCount: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    currentPageNo: PropTypes.number.isRequired
};

export default SearchResultPaginator;