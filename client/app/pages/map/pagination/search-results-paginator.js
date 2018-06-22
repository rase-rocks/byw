import PropTypes from "prop-types";
import React from "react";

import { makePageItem } from "./page-item";
import { pageNumbersFromCount } from "../../../core/model/pagination";

class SearchResultPaginator extends React.Component {
    render() {

        const { pageCount, currentPageNo, onPageChange } = this.props;

        const numbers = pageNumbersFromCount(pageCount)
            .map(makePageItem(currentPageNo, onPageChange));

        return (
            <div>
                <ul className="pagination pagination-sm justify-content-center">
                    {numbers}
                </ul>
            </div>
        );
    }
}

SearchResultPaginator.propTypes = {
    pageCount: PropTypes.number.isRequired,
    currentPageNo: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default SearchResultPaginator;