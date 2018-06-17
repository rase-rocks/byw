import PropTypes from "prop-types";
import React from "react";

const makePageItem = function (currentPageNo, clickHandler) {
    return function pageItem(num) {

        const handle = function (e) {
            e.preventDefault();
            clickHandler(num);
        };

        return (<PageItem key={`page-no-${num}`}
            clickHandler={handle}
            pageNo={num}
            isCurrentPage={num === currentPageNo} />);
    };
};

class PageItem extends React.Component {
    render() {

        const { isCurrentPage, pageNo, clickHandler } = this.props;
        const className = (isCurrentPage) ? "page-item active" : "page-item";

        return (
            <li className={className}>
                <a className="page-link" onClick={clickHandler}>
                    {pageNo}
                </a>
            </li>
        );
    }
}

PageItem.propTypes = {
    pageNo: PropTypes.number.isRequired,
    isCurrentPage: PropTypes.bool,
    clickHandler: PropTypes.func.isRequired
};

export { makePageItem };
export default PageItem;