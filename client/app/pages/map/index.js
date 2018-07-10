import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import React from "react";

import {
    requestLocationsAction,
    filterLocationsAction,
    setSearchTextAction,
    setViewLocation
} from "../../core/redux/actions";
import { route } from "../../nav";
import bindMethods from "../../core/bind-methods";
import eventTargetValue from "../../core/event-target-value";
import MapPage from "./map-page";
import { pageResults, pageCount } from "../../core/model/pagination";

const value = eventTargetValue();

class MapPageController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchDistance: 20,
            resultsPerPage: 5,
            currentPageNo: 1
        };

        bindMethods(this, ["onTextChange", "onDistanceChange"]);
    }

    componentDidMount() {
        this.props.dispatch(requestLocationsAction());        
    }

    componentWillReceiveProps(props) {

        const { currentPageNo, resultsPerPage } = this.state;

        const count = pageCount(props.filteredResults.length, resultsPerPage);
        const adjustedPageNo = (currentPageNo > count) ? 1 : currentPageNo;

        this.setState({ currentPageNo: adjustedPageNo });
    }

    onTextChange() {
        const self = this;
        return function (e) {
            const searchFor = value(e);
            self.props.dispatch(setSearchTextAction(searchFor));
        };
    }

    onDistanceChange() {
        const self = this;
        return function (newDistance) {
            self.setState({ searchDistance: newDistance });
            self.props.dispatch(filterLocationsAction(self.state.searchText, newDistance));
        };
    }

    onShowLocation() {
        const self = this;
        return function (location) {
            return function () {
                self.props.dispatch(setViewLocation(location));
            };
        };
    }

    onReview() {
        const self = this;
        return function (location) {
            self.props.history.push(route.submit);
            self.props.dispatch(setViewLocation(location));
        };
    }

    onPageChange() {
        const self = this;
        return function (newPageNumber) {
            self.setState({
                currentPageNo: newPageNumber
            });
        };
    }

    render() {

        const { filteredResults, searchText, selectedLocation } = this.props;
        const { currentPageNo, resultsPerPage } = this.state;

        const totalCount = filteredResults.length;
        const count = pageCount(totalCount, resultsPerPage);
        const results = pageResults(filteredResults, currentPageNo, resultsPerPage);

        return (
            <MapPage totalCount={totalCount}
                pageResults={results}
                pageCount={count}
                currentPageNo={currentPageNo}
                selectedLocation={selectedLocation}
                searchText={searchText}
                searchDistance={this.state.searchDistance}
                searchValueDidChange={this.onTextChange()}
                searchDistanceDidChange={this.onDistanceChange()}
                onShowLocation={this.onShowLocation()}
                onReview={this.onReview()}
                onPageChange={this.onPageChange()} />
        );
    }
}

MapPageController.propTypes = {
    filteredResults: PropTypes.array,
    selectedLocation: PropTypes.object,
    searchText: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

const mapStateToProps = function (state) {
    return {
        filteredResults: state.data.filteredResults,
        selectedLocation: state.data.selectedLocation,
        searchText: state.data.searchText
    };
};

export default connect(mapStateToProps)(withRouter(MapPageController));