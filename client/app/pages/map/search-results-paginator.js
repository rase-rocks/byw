import PropTypes from "prop-types";
import React from "react";

import { pageNumbersFromCount } from "../../core/model/pagination";

class SearchResultPaginator extends React.Component {
    render() {

        const numbers = pageNumbersFromCount(this.props.pageCount).map(num => {
            return (<li key={`page-no-${num}`}>{num}</li>);
        });

        return (
            <div>
                <ul>
                    {numbers}
                </ul>
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