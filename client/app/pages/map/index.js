import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import {
    requestLocationsAction,
    filterLocationsAction,
    setViewLocation
} from "../../core/redux/actions";

import arrayCompare from "../../core/model/array-compare";
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
            pageResults: [],
            currentPageNo: 1
        };

        bindMethods(this, ["onTextChange", "onDistanceChange"]);
    }

    componentWillReceiveProps(newProps) {

        const { resultsPerPage } = this.state;
        const { filteredResults } = this.props;
        const pageNo = (arrayCompare(this.props.filteredResults,
            newProps.filteredResults))
            ? this.state.currentPageNo
            : 1;

        this.setState({
            pageResults: pageResults(filteredResults, pageNo, resultsPerPage),
            currentPageNo: pageNo
        });
    }

    componentDidMount() {
        this.props.dispatch(requestLocationsAction());
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
                pageResults: pageResults(this.props.filteredResults, newPageNumber),
                currentPageNo: newPageNumber
            });
        };
    }

    render() {

        const totalCount = this.props.filteredResults.length;
        const count = pageCount(totalCount, this.state.resultsPerPage);

        return (
            <MapPage totalCount={totalCount}
                pageResults={this.state.pageResults}
                pageCount={count}
                currentPageNo={this.state.currentPageNo}
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