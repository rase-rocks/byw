import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import React from "react";

import {
    requestLocationsAction,
    filterLocationsAction,
    setSearchTextAction,
    setViewLocationAction
} from "../../core/redux/actions";
import { route } from "../../nav";
import bindMethods from "../../core/bind-methods";
import eventTargetValue from "../../core/event-target-value";
import MapPage from "./map-page";
import { pageResults, pageCount } from "../../core/model/pagination";
import text from "../../core/text/data";

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

    UNSAFE_componentWillReceiveProps(props) {

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
                self.props.dispatch(setViewLocationAction(location));
            };
        };
    }

    onReview() {
        const self = this;
        return function (location) {
            self.props.history.push(route.submit);
            self.props.dispatch(setViewLocationAction(location));
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

        const { 
            language,
            filteredResults, 
            searchText, 
            selectedLocation, 
            locations 
        } = this.props;

        const { 
            currentPageNo, 
            resultsPerPage 
        } = this.state;

        const content = text[language];

        const totalCount = filteredResults.length;
        const count = pageCount(totalCount, resultsPerPage);
        const results = pageResults(filteredResults, currentPageNo, resultsPerPage);

        return (
            <MapPage text={content}
                locations={locations}
                totalCount={totalCount}
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
    language: PropTypes.string.isRequired,
    locations: PropTypes.array,
    filteredResults: PropTypes.array,
    selectedLocation: PropTypes.object,
    searchText: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

const mapStateToProps = function (state) {
    return {
        language: state.settings.language,
        locations: state.data.locations,
        filteredResults: state.data.filteredResults,
        selectedLocation: state.data.selectedLocation,
        searchText: state.data.searchText
    };
};

export default connect(mapStateToProps)(withRouter(MapPageController));