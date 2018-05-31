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

const value = eventTargetValue();

class MapPageController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchText: "",
            searchDistance: 20
        };

        bindMethods(this, ["onTextChange", "onDistanceChange"]);
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

    render() {
        return (
            <MapPage filteredResults={this.props.filteredResults}
                selectedLocation={this.props.selectedLocation}
                searchText={this.state.searchText}
                searchDistance={this.state.searchDistance}
                searchValueDidChange={this.onTextChange()}
                searchDistanceDidChange={this.onDistanceChange()}
                onShowLocation={this.onShowLocation()} />
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