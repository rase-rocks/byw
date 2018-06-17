import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import {
    requestLocationsAction,
    filterLocationsAction,
    setViewLocation
} from "../../core/redux/actions";

import bindMethods from "../../core/bind-methods";
import eventTargetValue from "../../core/event-target-value";
import MapPage from "./map-page";
import { pageResults, pageCount } from "../../core/model/pagination";

const value = eventTargetValue();

class MapPageController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchText: "",
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
            self.setState({ searchText: searchFor });
            self.props.dispatch(filterLocationsAction(searchFor, self.state.searchDistance));
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

    onPageChange() {
        const self = this;
        return function (newPageNumber) {
            self.setState({
                currentPageNo: newPageNumber
            });
        };
    }

    render() {

        const { filteredResults } = this.props;
        const { currentPageNo, resultsPerPage } = this.state;

        const totalCount = filteredResults.length;
        const count = pageCount(totalCount, this.state.resultsPerPage);


        const results = pageResults(filteredResults, currentPageNo, resultsPerPage);

        return (
            <MapPage totalCount={totalCount}
                pageResults={results}
                pageCount={count}
                currentPageNo={currentPageNo}
                selectedLocation={this.props.selectedLocation}
                searchText={this.state.searchText}
                searchDistance={this.state.searchDistance}
                searchValueDidChange={this.onTextChange()}
                searchDistanceDidChange={this.onDistanceChange()}
                onShowLocation={this.onShowLocation()}
                onPageChange={this.onPageChange()} />
        );
    }
}

MapPageController.propTypes = {
    filteredResults: PropTypes.array,
    selectedLocation: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = function (state) {
    return {
        filteredResults: state.data.filteredResults,
        selectedLocation: state.data.selectedLocation
    };
};

export default connect(mapStateToProps)(MapPageController);